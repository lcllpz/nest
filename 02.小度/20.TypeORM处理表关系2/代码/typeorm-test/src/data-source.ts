import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  database: "typeorm_test",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  synchronize: true,
  logging: true,
  entities: ['./**/entity/*.ts'],
  migrations: [],
  subscribers: [],
});
