/** 方法装饰器：打印 target / 方法名 / descriptor */
export function logDescriptor(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log("方法装饰器参数:", { target, propertyKey, descriptor });
}

/** 记录方法调用与返回值 */
export function log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`调用方法 ${propertyKey} 参数:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`方法 ${propertyKey} 返回:`, result);
    return result;
  };
  return descriptor;
}

/** 工厂：校验方法参数 */
export function validate(
  validator: (args: any[]) => boolean,
  errorMessage: string
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (!validator(args)) {
        throw new Error(`${propertyKey}: ${errorMessage}`);
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

/** 替换方法时保留 this */
export function preserveContext(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    return originalMethod.apply(this, args);
  };
  return descriptor;
}
