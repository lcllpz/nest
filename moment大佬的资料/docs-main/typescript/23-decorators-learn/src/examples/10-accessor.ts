/**
 * 对应文档：访问器装饰器
 * 注意：装饰器只能加在 getter 或 setter 的「第一个」声明上
 * 运行：npm run 10:accessor
 */
import { logAccess, validateLength } from "../decorators";

class Person {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }

  @logAccess
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}

console.log("=== logAccess ===");
const person = new Person("张三");
console.log(person.name);
person.name = "李四";
console.log(person.name);

class User {
  private _username: string;
  constructor(username: string) {
    this._username = username;
  }

  @validateLength(3, 20)
  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}

console.log("\n=== validateLength ===");
const user = new User("admin");
console.log(user.username);

try {
  user.username = "a";
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
