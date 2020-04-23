import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) throw new Error('Incorrect email');

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) throw new Error('Incorrect password');

    const token = sign({}, 'c05ac142b7b12426cefb43e81caf7ad1', {
      subject: user.id,
      expiresIn: '1d',
    });

    delete user.password;

    return { user, token };
  }
}

export default CreateSessionService;
