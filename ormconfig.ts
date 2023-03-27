import console from "console";
import { DataSource, DataSourceOptions } from "typeorm";
import * as entities from './src/entities/index';
import * as migrations from './src/migrations/index';

function getListBuildConfigDb(dictValue: any) {
  const arrPush: any[] = []
  for (const name in dictValue) {
    if (Object.prototype.hasOwnProperty.call(dictValue, name)) {
      const value: any = (dictValue as any)[name];
      arrPush.push(value);
    }
  }
  return arrPush
}

const arrEntities = getListBuildConfigDb(entities)
const arrMigrations = getListBuildConfigDb(migrations)

const conFigDB = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "sammy",
  password: "123456789",
  database: "node_test_api",
  logging: false,
  synchronize: false,
  entities: arrEntities,
  migrations: arrMigrations
} as DataSourceOptions

export const dataSource = new DataSource(conFigDB); // config is one that is defined in datasource.config.ts file
