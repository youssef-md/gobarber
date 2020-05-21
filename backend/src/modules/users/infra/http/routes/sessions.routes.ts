import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const usersRepository = new UsersRepository();

  const { email, password } = req.body;

  const { user, token } = await new AuthenticateUserService(
    usersRepository,
  ).execute({
    email,
    password,
  });

  return res.json({ user, token });
});

export default sessionsRouter;
