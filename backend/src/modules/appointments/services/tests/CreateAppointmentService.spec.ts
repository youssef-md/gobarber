import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '../CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(function instantiateAllTheDependencies() {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(function returnPastDate() {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const provider_id = '123';
    const appointment = await createAppointment.execute({
      user_id: 'user_id',
      provider_id,
      date: new Date(2020, 4, 10, 13),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(provider_id);
  });

  it('should not create an appointment in the same date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(function returnPastDate() {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const provider_id = '123';
    const appointmentsDate = new Date(2020, 4, 10, 13);

    await createAppointment.execute({
      user_id: 'user_id',
      provider_id,
      date: appointmentsDate,
    });

    await expect(
      createAppointment.execute({
        user_id: 'user_id',
        provider_id,
        date: appointmentsDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(function returnPastDate() {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    );
  });
});
