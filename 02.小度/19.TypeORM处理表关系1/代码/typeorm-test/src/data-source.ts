import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { IdCard } from "./entity/IdCard";

export const AppDataSource = new DataSource({
  type: "mysql",
  database: "typeorm_test",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  synchronize: true,
  logging: true,
  entities: [User, IdCard],
  migrations: [],
  subscribers: [],
});
