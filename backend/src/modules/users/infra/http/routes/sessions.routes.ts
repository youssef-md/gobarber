import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await new AuthenticateUserService().execute({
    email,
    password,
  });

  return res.json({ user, token });
});

export default sessionsRouter;
