import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import AppError from '@shared/errors/AppError';
import ResetUserPasswordService from '../ResetUserPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetUserPassword: ResetUserPasswordService;

describe('ResetUserPassword', () => {
  beforeEach(async function instantiateAllTheDependencies() {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetUserPassword = new ResetUserPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('should reset the requested user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Youssef',
      email: 'youssef@gmail.com',
      password: '123123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetUserPassword.execute({ token, password: 'asdfasdf' });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('asdfasdf');
  });

  it('should not reset the password if an invalid token is provided', async () => {
    await expect(
      resetUserPassword.execute({ token: 'error', password: 'asdfasdf' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
