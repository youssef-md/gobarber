import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuth);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsReposity.find();

//   return res.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
