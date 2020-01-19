import { parseISO, startOfHour, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../models/User';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';
import Cache from '../../lib/Cache';

class CreateAppointmentService {
  async run({ provider_id, user_id, date }) {
    if (provider_id === user_id)
      throw new Error('You can not create an appointment with yourself');

    // Check if provider_id is a provider
    const isProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true,
      },
    });

    if (!isProvider)
      throw new Error('You can only create appointments with providers');

    // Check for past dates
    const reqHourOnly = startOfHour(parseISO(date));
    if (isBefore(reqHourOnly, new Date()))
      throw new Error('Past date is not allowed');

    // Check provider date availability
    const checkProviderAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: reqHourOnly,
      },
    });

    if (checkProviderAvailability)
      throw new Error('Appointment date is not available');

    const appointment = await Appointment.create({
      user_id: user_id,
      provider_id,
      date: reqHourOnly,
    });

    // Notify appointment to the provider
    const user = await User.findByPk(user_id);

    const formattedDate = format(
      reqHourOnly,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para o ${formattedDate}`,
      provider: provider_id,
    });

    // Invalidate Cache
    await Cache.invalidateWithPrefix(`user:${user_id}:appointments`);

    return appointment;
  }
}

export default new CreateAppointmentService();
