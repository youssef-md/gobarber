import * as Yup from 'yup';

import { startOfHour, parseISO, isBefore } from 'date-fns';

import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails!' });

    const { provider_id, date } = req.body;

    // Check if provider_id is a provider
    const isProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true,
      },
    });

    if (!isProvider)
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });

    // Check for past dates
    const reqHourOnly = startOfHour(parseISO(date));
    if (isBefore(reqHourOnly, new Date()))
      return res.status(400).json({ error: 'Past date is not allowed' });

    // Check provider date availability
    const checkProviderAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: reqHourOnly,
      },
    });

    if (checkProviderAvailability)
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: reqHourOnly,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
