import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import uploadConfig from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ensureAuth from '../middlewares/ensureAuth';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const usersRepository = new UsersRepository();

  const { name, email, password } = req.body;

  const user = await new CreateUserService(usersRepository).execute({
    name,
    email,
    password,
  });

  delete user.password;

  return res.json(user);
});

// update only one info from user PATCH
usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  async (req, res) => {
    const usersRepository = new UsersRepository();

    const user = await new UpdateUserAvatarService(usersRepository).execute({
      user_id: req.user.id,
      filename: req.file.filename,
    });

    delete user.password;

    return res.json(user);
  },
);

export default usersRouter;
