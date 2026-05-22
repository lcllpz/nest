/**
 * 对应文档：类装饰器 — 返回新构造函数替换原类
 * 运行：npm run 03:class-replace
 */
import { replaceClass } from "../decorators";

@replaceClass
class OriginalClass {
  originalProperty = "原始属性";
  constructor() {
    console.log("原始构造函数被调用");
  }
  originalMethod() {
    return "原始方法";
  }
}

const instance = new OriginalClass();
console.log(instance.originalProperty);
console.log((instance as any).newProperty);
console.log(instance.originalMethod());
console.log((instance as any).newMethod());
