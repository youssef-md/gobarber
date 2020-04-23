import { join } from 'path';
import { promises } from 'fs';
import { getRepository } from 'typeorm';

import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  filename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, filename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user)
      throw new AppError('Only authenticated users can change avatar', 401);

    if (user.avatar) {
      // Delete previous avatar
      const userAvatarFilePath = join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await promises.unlink(userAvatarFilePath);
    }

    user.avatar = filename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
