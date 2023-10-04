/* eslint-disable no-console */

import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { ToDo } from '../entities/ToDo';

const connectDB = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [ToDo, User],
  logging: true,
  synchronize: true
});

export default connectDB;
