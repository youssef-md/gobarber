import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsReposity from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuth);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsReposity.find();

//   return res.json(appointments);
// });

appointmentsRouter.post('/', async (req, res) => {
  const appointmentsRepository = new AppointmentsReposity();

  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date); // from string to Date

  const appointment = await new CreateAppointmentService(
    appointmentsRepository,
  ).execute({
    provider_id,
    date: parsedDate,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
