import "reflect-metadata";
import { DataSource } from "typeorm";

import { join } from "path";

export const AppDataSource = new DataSource({
  type: "mysql",
  database: "learn",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  synchronize: true,
  logging: true,
  entities: [join(__dirname, "entity", "*.{ts,js}")],
  migrations: [],
  subscribers: [],
});
