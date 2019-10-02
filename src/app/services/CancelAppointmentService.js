import { isBefore, subHours } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class CancelAppointmentService {
  async run({ appointment_id, user_id }) {
    const appointment = await Appointment.findByPk(appointment_id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== user_id)
      throw new Error('You are not allowed to cancel this appointment');

    const subtractAppointmentDate = subHours(appointment.date, 1);
    if (isBefore(subtractAppointmentDate, new Date()))
      throw new Error('You can only cancel appointments 1 hour in advance');

    appointment.canceled_at = new Date();
    await appointment.save();

    await Queue.add(CancellationMail.key, { appointment });
    return appointment;
  }
}

export default new CancelAppointmentService();
