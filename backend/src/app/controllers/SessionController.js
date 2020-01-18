import jwt from 'jsonwebtoken';

import User from '../models/User';
import File from '../models/File';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url', 'id'],
        },
      ],
    });

    if (!user) return res.status(401).json({ error: 'Email não encontrado' });

    if (!(await user.checkPassword(password)))
      return res.status(401).json({ error: 'Senha incorreta' });

    const { id, name, provider, avatar } = user;

    return res.json({
      user: { id, name, email, provider, avatar },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
