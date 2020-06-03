import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, old_password, password } = req.body;
    const user_id = req.user.id;

    const updateUserProfile = container.resolve(UpdateProfileService);
    const user = await updateUserProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    delete user.password;

    return res.json(user);
  }
}
