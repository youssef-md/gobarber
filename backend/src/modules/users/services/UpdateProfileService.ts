import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    const userWithTheSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithTheSameEmail && userWithTheSameEmail.id !== user_id)
      throw new AppError('Email already in user');

    if (password && !old_password)
      throw new AppError('You must inform the old password');

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash({
        payload: old_password,
        hashed: user.password,
      });

      if (!checkOldPassword) throw new AppError('Old password does not match');

      user.password = await this.hashProvider.generateHash(password);
    }

    (user.name = name), (user.email = email);

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
