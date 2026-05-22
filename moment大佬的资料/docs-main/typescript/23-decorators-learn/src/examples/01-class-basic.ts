/**
 * 对应文档：类装饰器 — 基础
 * 运行：npm run 01:class-basic
 */
import { classDecorator } from "../decorators";

@classDecorator
class Example {
  constructor() {
    console.log("Example 类被实例化");
  }
}

console.log("--- 实例化 ---");
new Example();

// @classDecorator
// class User {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }
