import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail({ to, body }: ISendMailDTO): Promise<void>;
}
