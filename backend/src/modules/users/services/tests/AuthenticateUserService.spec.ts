import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from '../AuthenticateUserService';
import CreateUserService from '../CreateUserService';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(async function instantiateAllTheDependencies() {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should create a new User', async () => {
    const user = await createUser.execute({
      name: 'Youssef',
      email: 'youssef@gmail.com',
      password: '123123',
    });

    const { token, user: userPayload } = await authenticateUser.execute({
      email: 'youssef@gmail.com',
      password: '123123',
    });

    expect(user).toEqual(userPayload);
    expect(token).toBeTruthy();
  });

  it('should not authorize invalid email', async () => {
    await expect(
      authenticateUser.execute({
        email: 'error@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not authorize user with the wrong password', async () => {
    const userEmail = 'youssef@gmail.com';

    await createUser.execute({
      name: 'Youssef',
      email: userEmail,
      password: '123123',
    });

    await expect(
      authenticateUser.execute({
        email: userEmail,
        password: '000000',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
