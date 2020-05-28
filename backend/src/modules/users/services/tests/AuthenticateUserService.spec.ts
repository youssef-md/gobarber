import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from '../AuthenticateUserService';
import CreateUserService from '../CreateUserService';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should create a new User', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

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
});
