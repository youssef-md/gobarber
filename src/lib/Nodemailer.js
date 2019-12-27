import nodemailer from 'nodemailer';
import mailConfig from '../config/nodemailer';

class Nodemailer {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null, // there are email strategies that don't need user
    });
  }

  sendMail(message) {
    return this.transporter.sendMail({ ...mailConfig.default, ...message });
  }
}

export default new Nodemailer();
