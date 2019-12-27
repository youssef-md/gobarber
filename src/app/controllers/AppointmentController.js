import * as Yup from 'yup';

import {
  startOfHour,
  parseISO,
  isBefore,
  isAfter,
  format,
  subHours,
} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

import Nodemailer from '../../lib/Nodemailer';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      attributes: ['id', 'date'],
      order: ['date'],
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
      return res.status(400).json({ error: 'Validation fails!' });

    const { provider_id, date } = req.body;

    if (provider_id === req.userId)
      return res
        .status(401)
        .json({ error: 'You can not create an appointment with yourself' });

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

    // Notify appointment to the provider
    const user = await User.findByPk(req.userId);

    const formattedDate = format(
      reqHourOnly,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para o ${formattedDate}`,
      provider: provider_id,
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
      return res.status(401).json({
        error: 'You do not have permission to cancel this appointment',
      });

    const limitDateToCancel = subHours(appointment.date, 1); // until 1 hour before the appointment
    if (isAfter(new Date(), limitDateToCancel))
      return res
        .status(401)
        .json({ error: 'You can only cancel appointments 1 hour in advance' });

    appointment.canceled_at = new Date();
    await appointment.save();

    await Nodemailer.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: `${appointment.user.name} cancelou o agendamento`,
      text: 'Você tem um novo cancelamento...',
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
