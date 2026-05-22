export function logAccess(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalGet = descriptor.get;
  const originalSet = descriptor.set;

  if (originalGet) {
    descriptor.get = function () {
      console.log(`获取 ${propertyKey} 的值`);
      return originalGet.call(this);
    };
  }

  if (originalSet) {
    descriptor.set = function (value: any) {
      console.log(`设置 ${propertyKey} 的值为: ${value}`);
      originalSet.call(this, value);
    };
  }

  return descriptor;
}

export function validateLength(min: number, max: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalSet = descriptor.set;
    if (!originalSet) {
      throw new Error(`${propertyKey} 没有 setter 方法`);
    }
    descriptor.set = function (this: any, value: string) {
      if (value.length < min) {
        throw new Error(`${propertyKey} 长度不能小于 ${min}`);
      }
      if (value.length > max) {
        throw new Error(`${propertyKey} 长度不能大于 ${max}`);
      }
      originalSet.call(this, value);
    };
    return descriptor;
  };
}
