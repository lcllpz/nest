/**
 * 对应文档：类装饰器 — 监控实例化
 * 运行：npm run 04:class-monitor
 */
import { monitor } from "../decorators";

@monitor
class Person {
  constructor(
    public name: string,
    public age: number
  ) {
    console.log("Person 构造函数执行");
  }
}

const person = new Person("张三", 30);
console.log(person.name, person.age);
