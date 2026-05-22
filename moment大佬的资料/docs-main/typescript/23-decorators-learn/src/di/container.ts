export enum Lifecycle {
  TRANSIENT,
  SINGLETON,
  SCOPED,
}

export interface DependencyInfo {
  token: symbol | string;
}

export interface ServiceRegistration {
  token: symbol | string;
  type: any;
  lifecycle: Lifecycle;
  instance?: any;
  factory?: () => any;
  dependencies?: DependencyInfo[];
}

export class DIContainer {
  private static instance: DIContainer;
  private services: Map<symbol | string, ServiceRegistration> = new Map();

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  register(
    token: symbol | string,
    type: any,
    lifecycle: Lifecycle = Lifecycle.SINGLETON
  ): void {
    const dependencies =
      Reflect.getMetadata("di:dependencies", type) || [];
    this.services.set(token, {
      token,
      type,
      lifecycle,
      dependencies,
    });
    console.log(
      `服务注册: ${String(token)}, 生命周期: ${Lifecycle[lifecycle]}`
    );
  }

  registerFactory(
    token: symbol | string,
    factory: () => any,
    lifecycle: Lifecycle = Lifecycle.SINGLETON
  ): void {
    this.services.set(token, {
      token,
      type: Object,
      lifecycle,
      factory,
    });
    console.log(
      `工厂注册: ${String(token)}, 生命周期: ${Lifecycle[lifecycle]}`
    );
  }

  resolve<T>(token: symbol | string): T {
    const registration = this.services.get(token);
    if (!registration) {
      throw new Error(`服务未注册: ${String(token)}`);
    }

    if (
      registration.lifecycle === Lifecycle.SINGLETON &&
      registration.instance
    ) {
      return registration.instance;
    }

    let instance: T;

    if (registration.factory) {
      instance = registration.factory() as T;
    } else {
      const dependencies = (registration.dependencies || []).map(
        (dep: DependencyInfo) => {
          if (dep?.token) {
            return this.resolve(dep.token);
          }
          return undefined;
        }
      );
      instance = new registration.type(...dependencies) as T;
    }

    if (registration.lifecycle === Lifecycle.SINGLETON) {
      registration.instance = instance;
    }

    return instance;
  }
}
