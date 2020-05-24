import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import ensureAuth from '../middlewares/ensureAuth';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

// update only one info from user PATCH
usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
