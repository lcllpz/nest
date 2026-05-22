/**
 * 对应文档：类装饰器 — 在原型上添加属性和方法
 * 运行：npm run 02:class-add-properties
 */
import { addProperties } from "../decorators";

@addProperties
class MyClass {
  originalMethod() {
    return "原始方法";
  }
}

const obj = new MyClass();
console.log((obj as any).newProperty);
console.log((obj as any).newMethod());
console.log((MyClass as any).staticProperty);
console.log(obj.originalMethod());
