import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should create a new User', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Youssef',
      email: 'youssef@gmail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not create an user with a duplicated email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const userEmail = 'youssef@gmail.com';

    await createUser.execute({
      name: 'Youssef',
      email: userEmail,
      password: '123123',
    });

    expect(
      createUser.execute({
        name: 'Muhamad',
        email: userEmail,
        password: 'batata',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
