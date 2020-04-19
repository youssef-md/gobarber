import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.json({ ok: false }));

export default routes;
