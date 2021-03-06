import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from '../UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(function instantiateAllTheDependencies() {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should the passed file as an avatar for the user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Youssef',
      email: 'youssef@gmail.com',
      password: '123123',
    });

    const userAvatarFilename = 'youssef.jpg';
    await updateUserAvatar.execute({
      user_id: user.id,
      filename: userAvatarFilename,
    });

    expect(user.avatar).toEqual(userAvatarFilename);
  });

  it('should not allow unexistent user to add an avatar', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'error',
        filename: 'error.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete the previous users avatar if exists', async () => {
    const spyDeleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Youssef',
      email: 'youssef@gmail.com',
      password: '123123',
    });

    const oldUserAvatar = 'avatar1.jpg';
    await updateUserAvatar.execute({
      user_id: user.id,
      filename: oldUserAvatar,
    });

    const newUserAvatar = 'avatar2.jpg';
    await updateUserAvatar.execute({
      user_id: user.id,
      filename: newUserAvatar,
    });

    expect(spyDeleteFile).toHaveBeenCalledWith(oldUserAvatar);
    expect(user.avatar).toEqual(newUserAvatar);
  });
});
