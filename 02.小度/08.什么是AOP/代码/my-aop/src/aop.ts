// 定义 Before 装饰器
export function Before(fn: Function) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      fn(...args); // 执行增强逻辑（例如：日志、验证等）
      return originalMethod.apply(this, args); // 执行原始方法
    };
  };
}

// 定义 After 装饰器
export function After(fn: Function) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args); // 执行原始方法
      fn(result, ...args); // 执行增强逻辑（例如：修改返回值、日志等）
      return result;
    };
  };
}

// 定义 Around 装饰器
export function Around(fn: Function) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      fn(originalMethod, args); // 在原方法执行前后插入逻辑
      return originalMethod.apply(this, args); // 执行原始方法
    };
  };
}