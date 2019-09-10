import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (error, res) => {
        if (error) return cb(error);
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
