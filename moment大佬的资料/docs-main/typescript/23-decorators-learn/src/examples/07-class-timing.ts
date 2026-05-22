/**
 * 对应文档：类装饰器在「类定义时」执行，而非实例化时
 * 运行：npm run 07:class-timing
 */
import { logClass } from "../decorators";

@logClass
class Example {}

console.log("程序开始执行");
