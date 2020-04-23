import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../service/CreateUserService';
import ensureAuth from '../middlewares/ensureAuth';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../service/UpdateUserAvatarService';

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
    try {
      const user = await new UpdateUserAvatarService().execute({
        user_id: req.user.id,
        filename: req.file.filename,
      });

      delete user.password;

      return res.json(user);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  },
);

export default usersRouter;
