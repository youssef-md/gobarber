import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetUserPasswordService from '@modules/users/services/ResetUserPasswordService';

export default class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const resetPassword = container.resolve(ResetUserPasswordService);

    await resetPassword.execute({ token, password });

    return res.status(204).json();
  }
}
