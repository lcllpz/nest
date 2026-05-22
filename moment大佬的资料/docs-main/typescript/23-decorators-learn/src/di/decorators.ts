import "reflect-metadata";
import { DIContainer, Lifecycle } from "./container";

export function Service(
  token: symbol | string = Symbol(),
  lifecycle: Lifecycle = Lifecycle.SINGLETON
) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    const serviceToken = token || Symbol(target.name);
    const container = DIContainer.getInstance();
    container.register(serviceToken, target, lifecycle);
    Reflect.defineMetadata("di:token", serviceToken, target);
    return target;
  };
}

export function Inject(token: symbol | string = Symbol()) {
  return function (target: any, propertyKey: string) {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    const serviceToken =
      token ||
      Reflect.getMetadata("di:token", type) ||
      Symbol(propertyKey);

    Object.defineProperty(target, propertyKey, {
      get: function () {
        return DIContainer.getInstance().resolve(serviceToken);
      },
      enumerable: true,
      configurable: true,
    });
  };
}

export function InjectParam(token: symbol | string = Symbol()) {
  return function (
    target: Object,
    methodName: string | symbol | undefined,
    parameterIndex: number
  ) {
    const dependencies: { token: symbol | string }[] =
      Reflect.getMetadata("di:dependencies", target) || [];
    dependencies[parameterIndex] = { token };
    Reflect.defineMetadata("di:dependencies", dependencies, target);
  };
}

export function InjectMethod() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const methodDependencies: { token: symbol | string }[] =
        Reflect.getMetadata("di:method:dependencies", target, propertyKey) ||
        [];
      const container = DIContainer.getInstance();
      const newArgs = [...args];
      for (let i = 0; i < methodDependencies.length; i++) {
        const dep = methodDependencies[i];
        if (dep?.token) {
          newArgs[i] = container.resolve(dep.token);
        }
      }
      return originalMethod.apply(this, newArgs);
    };
    return descriptor;
  };
}

export function InjectMethodParam(token: symbol | string = Symbol()) {
  return function (
    target: Object,
    methodName: string | symbol,
    parameterIndex: number
  ) {
    const dependencies: { token: symbol | string }[] =
      Reflect.getMetadata("di:method:dependencies", target, methodName) || [];
    dependencies[parameterIndex] = { token };
    Reflect.defineMetadata(
      "di:method:dependencies",
      dependencies,
      target,
      methodName
    );
  };
}
