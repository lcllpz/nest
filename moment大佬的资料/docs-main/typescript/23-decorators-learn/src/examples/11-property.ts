/**
 * 对应文档：属性装饰器（无 descriptor 参数）
 * 运行：npm run 11:property
 */
import { logProperty } from "../decorators";

class Person {
  @logProperty
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const person = new Person("张三");
console.log(person.name);
person.name = "李四";
console.log(person.name);
