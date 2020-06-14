import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailability from '@modules/appointments/services/ListProviderMonthAvailability';

export default class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { month, year } = req.body;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailability,
    );

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return res.json(availability);
  }
}
