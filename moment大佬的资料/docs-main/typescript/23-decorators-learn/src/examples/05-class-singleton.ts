/**
 * 对应文档：类装饰器 — 单例模式
 * 运行：npm run 05:class-singleton
 */
import { singleton } from "../decorators";

@singleton
class Database {
  private connectionString: string;
  constructor(connectionString: string) {
    this.connectionString = connectionString;
    console.log(`连接到数据库: ${connectionString}`);
  }
  query(sql: string) {
    console.log(`执行查询: ${sql}`);
    return `查询结果: ${sql}`;
  }
}

const db1 = new Database("mongodb://localhost:27017");
const db2 = new Database("mongodb://localhost:27018");
console.log("db1 === db2:", db1 === db2);
