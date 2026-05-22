export function logProperty(target: any, propertyKey: string) {
  let value = target[propertyKey];
  Object.defineProperty(target, propertyKey, {
    get: function () {
      console.log(`获取 ${propertyKey} 的值: ${value}`);
      return value;
    },
    set: function (newValue) {
      console.log(`设置 ${propertyKey} 的值: ${newValue}`);
      value = newValue;
    },
    enumerable: true,
    configurable: true,
  });
}
