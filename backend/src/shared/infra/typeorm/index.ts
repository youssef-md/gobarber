import { createConnections } from 'typeorm';

createConnections().then(() => console.log('Connected with databases!'));
