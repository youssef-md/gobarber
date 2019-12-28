import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Nodemailer from '../../lib/Nodemailer';

class CancelationMail {
  // getter, to allow access with CancelationMail.key
  get key() {
    return 'CancelationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    await Nodemailer.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: `${appointment.user.name} cancelou o agendamento`,
      template: 'cancelation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancelationMail();
