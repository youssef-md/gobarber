import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsReposity from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';
import ensureAuth from '../middlewares/ensureAuth';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuth);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsReposity = getCustomRepository(AppointmentsReposity);
  const appointments = await appointmentsReposity.find();

  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date); // from string to Date

  const appointment = await new CreateAppointmentService().execute({
    provider_id,
    date: parsedDate,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
