import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from '../SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover password using email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const spySendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Youssef',
      email: 'youssef@gmail.com',
      password: '123123',
    });

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await sendForgotPasswordEmail.execute({ email: 'youssef@gmail.com' });

    expect(spySendMail).toHaveBeenCalled();
  });

  it('Should not be able to recover a non-existenting user password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'error@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
