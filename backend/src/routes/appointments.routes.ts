import { Router } from 'express';

const appointmentsRouter = Router();

// http:localhost:3333/appointments/

const appointments = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const appointment = { id: Math.random(), provider, date };

  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;
