import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  const user = { name: 'youssef', email: 'youssef@gmail.com' };

  return res.json(user);
});

export default routes;
