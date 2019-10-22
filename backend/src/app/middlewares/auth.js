import { promisify } from 'util';

import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default async function(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'Token not provided' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  next();
}
