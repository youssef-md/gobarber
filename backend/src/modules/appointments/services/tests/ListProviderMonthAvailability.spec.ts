import ListProviderMonthAvailability from '../ListProviderMonthAvailability';
import FakeAppointmentsRepository from '../../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailability;

describe('ListProviderMonthAvailability', () => {
  beforeEach(function instantiateAllTheDependencies() {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailability(
      fakeAppointmentsRepository,
    );
  });

  it('should list the month availability from a provider', async () => {
    const providerId = 'provider_id';

    await fakeAppointmentsRepository.create({
      provider_id: providerId,
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerId,
      date: new Date(2020, 4, 10, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerId,
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerId,
      date: new Date(2020, 5, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: providerId,
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
      ]),
    );
  });
});
