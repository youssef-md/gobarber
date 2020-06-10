import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';
import { getHours } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailability {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    const hourStart = 8;
    const numbersOfHourstInDay = 11;

    const eachHourArray = Array.from(
      Array(numbersOfHourstInDay),
      (_, i) => i + hourStart,
    );

    const availability = eachHourArray.map(function getHoursAvailability(hour) {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      return {
        hour,
        available: !hasAppointmentInHour,
      };
    });

    console.log(availability);
    return availability;
  }
}

export default ListProviderDayAvailability;
