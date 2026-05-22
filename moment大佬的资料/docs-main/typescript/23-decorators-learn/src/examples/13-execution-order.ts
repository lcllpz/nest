/**
 * 对应文档：装饰器执行顺序
 * 规律：属性 → 参数(右→左) → 方法 → 访问器 → 类
 * 运行：npm run 13:execution-order
 */
function classDecorator(target: Function) {
  console.log("类装饰器执行:", target.name);
}

function methodDecorator(
  target: any,
  propertyKey: string,
  _descriptor: PropertyDescriptor
) {
  console.log(`方法装饰器执行: ${propertyKey}`);
}

function accessorDecorator(
  target: any,
  propertyKey: string,
  _descriptor: PropertyDescriptor
) {
  console.log(`访问器装饰器执行: ${propertyKey}`);
}

function propertyDecorator(target: any, propertyKey: string) {
  console.log(`属性装饰器执行: ${propertyKey}`);
}

function parameterDecorator(
  target: any,
  methodName: string,
  parameterIndex: number
) {
  console.log(
    `参数装饰器执行: 方法 ${methodName} 的第 ${parameterIndex} 个参数`
  );
}

@classDecorator
class Example {
  @propertyDecorator
  public property: string;

  constructor(property: string) {
    this.property = property;
  }

  @methodDecorator
  greet(@parameterDecorator name: string, @parameterDecorator age: number) {
    console.log(`Hello, ${name}. You are ${age} years old.`);
  }

  @accessorDecorator
  get greetMessage() {
    return "Hello, world!";
  }
}

console.log("\n--- 类已定义，观察上方输出顺序 ---");
