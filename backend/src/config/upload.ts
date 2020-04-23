import { resolve } from 'path';
import { randomBytes } from 'crypto';
import multer from 'multer';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp'),
    filename: (req, file, cb) => {
      const fileHash = randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};
