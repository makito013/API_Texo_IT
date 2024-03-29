import { DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

export const dbdatasource: DataSourceOptions = {
  type: 'sqlite',
  database:
    process.env.NODE_ENV === 'test'
      ? 'src/common/database/test'
      : process.env.DATABASE_PATH,
  synchronize:
    process.env.NODE_ENV === 'test' ||
    process.env.DATABASE_SYNCHRONIZE === 'true',
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  dropSchema: false,
};
