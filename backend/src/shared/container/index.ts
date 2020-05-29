import { container } from 'tsyringe';

// Import Providers dependencies(HashProvider)
import '@modules/users/providers';

// Import Providers dependencies(DiskStorage)
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsReposity from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsReposity,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
