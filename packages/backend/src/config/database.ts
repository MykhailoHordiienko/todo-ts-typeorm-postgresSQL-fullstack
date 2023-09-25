/* eslint-disable no-console */

import { createConnection, DataSourceOptions } from 'typeorm';

const connectDB = async () => {
  try {
    const options: DataSourceOptions = {
      //   host: process.env.POSTGRES_HOST,
      //   port: Number(process.env.POSTGRES_PORT),
      //   logging: ['query', 'error'],
      //   type: 'postgres',
      //   entities: ['dist/**/*.entity.{ts,js}'],
      //   migrations: ['dist/migrations/**/*.{ts,js}'],
      //   subscribers: ['src/subscriber/**/*.ts'],
      //   database: process.env.POSTGRES_DB,
      //   username: process.env.POSTGRES_USER,
      //   password: process.env.POSTGRES_PASSWORD,
      //   ssl: getSSLConfig(process.env.SERVER_MODE as string),
      //   synchronize: true
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: ['dist/**/*.entity.{ts,js}'],
      logging: true,
      synchronize: true
    };
    await createConnection(options);
    console.log('PostGres Connected ...');
  } catch (err) {
    console.error(err);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
