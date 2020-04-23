import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../service/CreateUserService';
import ensureAuth from '../middlewares/ensureAuth';
import uploadConfig from '../config/upload';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await new CreateUserService().execute({
      name,
      email,
      password,
    });

    delete user.password;

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// update only one info from user

usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  async (req, res) => {
    return res.json({ ok: true });
  },
);

export default usersRouter;
