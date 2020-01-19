import { subHours, isAfter } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';
import Queue from '../../lib/Queue';
import CancelationMail from '../jobs/CancelationMail';
import Cache from '../../lib/Cache';

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
      throw new Error('You do not have permission to cancel this appointment');

    const limitDateToCancel = subHours(appointment.date, 1); // until 1 hour before the appointment
    if (isAfter(new Date(), limitDateToCancel))
      throw new Error('You can only cancel appointments 1 hour in advance');

    appointment.canceled_at = new Date();
    await appointment.save();

    // Send the cancelation mail in a background job
    Queue.enqueue(CancelationMail.key, {
      appointment,
    });

    // Invalidate Cache
    await Cache.invalidateWithPrefix(`user:${user_id}:appointments`);

    return appointment;
  }
}

export default new CancelAppointmentService();
