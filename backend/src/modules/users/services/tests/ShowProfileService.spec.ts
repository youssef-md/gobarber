import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '../ShowProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showUserProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(function instantiateAllTheDependencies() {
    fakeUsersRepository = new FakeUsersRepository();
    showUserProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should show an user profile based on its id', async () => {
    const username = 'Youssef';
    const email = 'youssef@gmail.com';

    const user = await fakeUsersRepository.create({
      name: username,
      email,
      password: '123123',
    });

    const getUserProfile = await showUserProfile.execute({ user_id: user.id });

    expect(getUserProfile.name).toBe(username);
    expect(getUserProfile.email).toBe(email);
  });

  it('should not show the profile of a non-existing user', async () => {
    await expect(
      showUserProfile.execute({ user_id: 'non-existing-user-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
