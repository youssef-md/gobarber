import { Router } from 'express';
import CreateSessionService from '../service/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await new CreateSessionService().execute({
      email,
      password,
    });

    return res.json({ user, token });
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
});

export default sessionsRouter;
