import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'youssef',
    email: 'youssef@gmail.com',
    password_hash: '13123',
  });

  return res.json(user);
});

export default routes;
