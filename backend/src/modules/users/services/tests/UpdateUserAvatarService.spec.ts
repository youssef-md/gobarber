import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from '../UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should the passed file as an avatar for the user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await expect(
      updateUserAvatar.execute({
        user_id: 'error',
        filename: 'error.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete the previous users avatar if exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const spyDeleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

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
