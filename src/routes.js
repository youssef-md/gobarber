import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Youssef Muhadm',
    email: 'youssef@gmail.com',
    password_hash: '123131323',
  });
  return res.json(user);
});

export default routes;
