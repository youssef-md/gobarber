import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  // create(): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
