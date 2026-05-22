/**
 * 对应文档：参数装饰器（返回值被忽略，多用于元数据）
 * 运行：npm run 12:parameter
 */
import { logParameter } from "../decorators";

class Greeter {
  greet(@logParameter name: string, @logParameter age: number) {
    return `Hello, ${name}! You are ${age} years old.`;
  }

  static sayHi(@logParameter message: string) {
    console.log(message);
  }
}

console.log("--- 实例方法 ---");
const greeter = new Greeter();
console.log(greeter.greet("Tom", 25));

console.log("\n--- 静态方法 ---");
Greeter.sayHi("Hi there!");
