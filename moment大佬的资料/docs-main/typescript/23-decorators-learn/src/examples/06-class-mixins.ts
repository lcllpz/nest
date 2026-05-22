/**
 * 对应文档：类装饰器 — Mixins 混入
 * 运行：npm run 06:class-mixins
 */
import { ApplyMixins, Timestamped, Activatable } from "../decorators";

@ApplyMixins(Timestamped, Activatable)
class User {
  constructor(public name: string) {}
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

const user = new User("李四");
console.log(user.greet());
console.log("时间戳:", user.getTimestamp());
console.log("isActive:", user.isActive);
user.activate();
console.log("activate 后 isActive:", user.isActive);
