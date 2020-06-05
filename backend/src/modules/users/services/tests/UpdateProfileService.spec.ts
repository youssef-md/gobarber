import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '../UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: IHashProvider;
let updateUserProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(function instantiateAllTheDependencies() {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it("should update user's profile", async () => {
    const user = await fakeUsersRepository.create({
      name: 'Youssef',
      email: 'youssef@gmail.com',
      password: '123123',
    });

    const newUsername = 'Youssef Muhamad';
    const newUserEmail = 'youssefmuhamad@gmail.com';

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: newUsername,
      email: newUserEmail,
    });

    expect(updatedUser.name).toBe(newUsername);
    expect(updatedUser.email).toBe(newUserEmail);
  });

  it('should reject an used email', async () => {
    await fakeUsersRepository.create({
      name: 'José Maomé',
      email: 'youssef@gmail.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Youssef Muhamad',
      email: 'anotheremail@gmail.com',
      password: '123123',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'Youssef Muhamad',
        email: 'youssef@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Youssef',
      email: 'youssef@gmail.com',
      password: '123123',
    });

    const newPassword = 'aaabbb';
    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'Youssef',
      email: 'youssef@gmail.com',
      old_password: '123123',
      password: newPassword,
    });

    expect(updatedUser.password).toBe(newPassword);
  });

  it('should not update the password without old_password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Youssef',
      email: 'youssef@gmail.com',
      password: '123123',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'Youssef',
        email: 'youssef@gmail.com',
        password: 'aaabbb',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not update the password with a wrong old_password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Youssef',
      email: 'youssef@gmail.com',
      password: '123123',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'Youssef',
        email: 'youssef@gmail.com',
        old_password: 'wrong-old-password',
        password: 'aaabbb',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
