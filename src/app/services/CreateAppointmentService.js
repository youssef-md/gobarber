import { parseISO, startOfHour, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Appointment from '../models/Appointment';
import User from '../models/User';
import Notification from '../schemas/Notification';

class CreateAppointmentService {
  async run({ provider_id, user_id, date }) {
    if (provider_id === user_id)
      throw new Error('You can not create an appointment with yourself');

    // Check if the provider_id is a provider
    const provider = await User.findOne({
      where: { id: provider_id, provider: true },
    });
    if (!provider)
      throw new Error('You can only create appointments with providers');

    // block appointments in past hours
    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date()))
      throw new Error('Past dates are not allowed');

    // block repeated appointments
    const checkRepeatedAppointment = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });
    if (checkRepeatedAppointment)
      throw new Error('Appointment date is not available');

    const appointment = await Appointment.create({
      user_id,
      provider_id,
      date,
    });

    // Notify appointment to provider
    const user = await User.findByPk(user_id);
    const formatedDate = format(hourStart, "dd 'de' MMMM', às' H:mm'h'", {
      locale: pt,
    });

    await Notification.create({
      content: `${provider.name} você tem um novo agendamento com ${user.name} dia ${formatedDate}`,
      user: provider_id,
    });

    return appointment;
  }
}

export default new CreateAppointmentService();
