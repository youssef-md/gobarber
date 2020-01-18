import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController.js';
import AppointmentController from './app/controllers/AppointmentController.js';
import ScheduleController from './app/controllers/ScheduleController.js';
import NotificationController from './app/controllers/NotificationController.js';
import AvailableController from './app/controllers/AvailableController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateAppointmentStore from './app/validators/AppointmentStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', validateUserStore, UserController.store); // SignUp
routes.post('/sessions', validateSessionStore, SessionController.store); // Login

routes.use(authMiddleware); // Global token validator

routes.put('/users', validateUserUpdate, UserController.update); // User update

routes.get('/providers', ProviderController.index); // Get all Providers

routes.get('/providers/:providerId/available', AvailableController.index); // Get all Available time from a Provider

routes.post('/files', upload.single('file'), FileController.store); // Upload Picture

routes.get('/appointments', AppointmentController.index); // Get all User Appointment
routes.post(
  '/appointments',
  validateAppointmentStore,
  AppointmentController.store
); // Create an Appointment with a Provider
routes.delete('/appointments/:id', AppointmentController.delete); // Cancel an Appointment with a Provider

routes.get('/schedule', ScheduleController.index); // List Provider's schedule in a given date

routes.get('/notifications', NotificationController.index); // Get all Notifications from a Provider
routes.put('/notifications/:id', NotificationController.update); // Mark a Notification as read

export default routes;
