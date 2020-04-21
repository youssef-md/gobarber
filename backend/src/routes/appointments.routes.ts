import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsReposity from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentsRouter = Router();

// http:localhost:3333/appointments/

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsReposity = getCustomRepository(AppointmentsReposity);
  const appointments = await appointmentsReposity.find();

  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date); // from string to Date

    const appointment = await new CreateAppointmentService().execute({
      provider,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
