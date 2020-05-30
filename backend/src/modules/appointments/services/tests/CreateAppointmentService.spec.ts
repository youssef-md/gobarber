import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '../CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const provider_id = '123';
    const appointment = await createAppointment.execute({
      provider_id,
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(provider_id);
  });

  it('should not create an appointment in the same date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const provider_id = '123';
    const appointmentsDate = new Date();

    await createAppointment.execute({
      provider_id,
      date: appointmentsDate,
    });

    await expect(
      createAppointment.execute({
        provider_id,
        date: appointmentsDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
