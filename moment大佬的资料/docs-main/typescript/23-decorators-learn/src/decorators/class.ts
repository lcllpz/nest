/** 类装饰器：打印类名 */
export function classDecorator(constructor: Function) {
  console.log("类装饰器被调用");
  console.log(`装饰的类名: ${constructor.name}`);
  console.log(`装饰的类名: ${constructor}`);
}

/** 在原型上添加属性和方法 */
export function addProperties(constructor: Function) {
  (constructor as any).prototype.newMethod = function () {
    return "这是通过装饰器添加的新方法";
  };
  (constructor as any).prototype.newProperty = "这是通过装饰器添加的新属性";
  (constructor as any).staticProperty = "这是静态属性";
}

/** 返回新构造函数，增强原类 */
export function replaceClass<T extends { new (...args: any[]): {} }>(
  constructor: T,
) {
  return class extends constructor {
    newProperty = "新属性";
    constructor(...args: any[]) {
      super(...args);
      console.log("增强的构造函数被调用");
    }
    newMethod() {
      return "新方法";
    }
  };
}

/** 监控实例化过程 */
export function monitor<T extends { new (...args: any[]): {} }>(
  constructor: T,
) {
  return class extends constructor {
    constructor(...args: any[]) {
      console.log(`创建 ${constructor.name} 的实例，参数:`, args);
      super(...args);
      console.log(`${constructor.name} 实例创建完成`);
    }
  };
}

/** 单例模式 */
export function singleton<T extends { new (...args: any[]): {} }>(
  constructor: T,
) {
  console.log(1);

  const originalConstructor = constructor;
  const newConstructor: any = function (...args: any[]) {
    if (!newConstructor.instance) {
      newConstructor.instance = new originalConstructor(...args);
    }
    console.log("newConstructor.instance", newConstructor?.instance);

    return newConstructor.instance;
  };
  newConstructor.prototype = originalConstructor.prototype;
  return newConstructor as T;
}

export type Constructor<T = {}> = new (...args: any[]) => T;

export function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
    getTimestamp() {
      return this.timestamp;
    }
  };
}

export function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActive = false;
    activate() {
      this.isActive = true;
      return this;
    }
    deactivate() {
      this.isActive = false;
      return this;
    }
  };
}

export function ApplyMixins(
  ...mixins: Array<(base: Constructor) => Constructor>
) {
  console.log(mixins.length);
  // Activatable(Timestamped(Constructor))
  return function <T extends Constructor>(Base: T) {
    console.log("Base", Base);

    return mixins.reduce(
      (AccumulatedBase, Mixin) => Mixin(AccumulatedBase),
      Base,
    );
  };
}

export function logClass(constructor: Function) {
  console.log(`类 ${constructor.name} 被定义`);
  return constructor;
}
