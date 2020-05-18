import { Router } from 'express';
import CreateSessionService from '../service/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await new CreateSessionService().execute({
    email,
    password,
  });

  return res.json({ user, token });
});

export default sessionsRouter;
