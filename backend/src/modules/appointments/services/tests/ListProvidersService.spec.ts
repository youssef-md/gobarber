import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from '../ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(function instantiateAllTheDependencies() {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should list providers except logged user', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'User1',
      email: 'user1@gmail.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'User2',
      email: 'user2@gmail.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'loggedUser',
      email: 'loggedUser@gmail.com',
      password: '123123',
    });

    const providers = await listProviders.execute({
      except_user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
