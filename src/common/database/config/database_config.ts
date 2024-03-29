import { DataSource, DataSourceOptions } from 'typeorm';
import { dbdatasource } from '../local.data-source';

export const AppDataSource = new DataSource(dbdatasource as DataSourceOptions);
