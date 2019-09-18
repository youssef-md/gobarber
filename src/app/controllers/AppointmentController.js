import * as Yup from 'yup';
import { parseISO, startOfHour, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';
import Mail from '../../lib/Mail';

class AppointmentController {
  async index(req, res) {
    const { page } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails ' });

    const { provider_id, date } = req.body;

    if (provider_id === req.userId)
      return res
        .status(400)
        .json({ error: 'You can not create an appointment with yourself' });

    // Check if the provider_id is a provider
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider)
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });

    // block appointments in past hours
    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date()))
      return res.status(400).json({ error: 'Past dates are not allowed' });

    // block repeated appointments
    const checkRepeatedAppointment = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkRepeatedAppointment)
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    // Notify appointment to provider
    const user = await User.findByPk(req.userId);
    const formatedDate = format(hourStart, "dd 'de' MMMM', às' H:mm'h'", {
      locale: pt,
    });

    await Notification.create({
      content: `Novo agendamento de ${user.name} dia ${formatedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
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

    if (appointment.user_id !== req.userId)
      return res
        .status(401)
        .json({ error: 'You are not allowed to cancel this appointment' });

    const subtractAppointmentDate = subHours(appointment.date, 1);
    if (isBefore(subtractAppointmentDate, new Date()))
      return res.status(401).json({
        error: 'You can only cancel appointments 1 hour in advance',
      });

    appointment.canceled_at = new Date();
    await appointment.save();

    return res.json(appointment);
  }
}

export default new AppointmentController();
