/**
 * 对应文档：方法装饰器 — 日志与 descriptor 参数
 * 运行：npm run 08:method-log
 */
import { logDescriptor, log } from "../decorators";

class Calculator {
  @logDescriptor
  inspect() {}

  @log
  add(a: number, b: number) {
    return a + b;
  }
}

const calc = new Calculator();
console.log("--- 调用 add ---");
calc.add(1, 2);
