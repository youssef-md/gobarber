import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '../CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(function instantiateAllTheDependencies() {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
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

    const appointmentsDate = new Date(2020, 4, 10, 16);

    await createAppointment.execute({
      date: appointmentsDate,
      user_id: 'user_id',
      provider_id: 'provider_id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentsDate,
        user_id: 'user_id',
        provider_id: 'provider_id',
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
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create an appointment with the same user as the provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(function returnPastDate() {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: 'provider_id',
        user_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create an appointment in an invalid hour', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(function returnPastDate() {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 20),
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
