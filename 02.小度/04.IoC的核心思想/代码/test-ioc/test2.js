class Container {
  constructor() {
    this.services = new Map(); // 存储服务实例
  }

  // 注册服务到容器中
  register(name, service) {
    this.services.set(name, service);
  }

  // 获取服务实例
  get(name) {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found!`);
    }
    // 如果服务是一个工厂函数，执行它来创建实例
    if (typeof service === 'function') {
      const instance = service(this); // 创建实例
      this.services.set(name, instance); // 缓存实例
      return instance;
    }
    return service;
  }
}

// PaymentService 负责处理支付
class PaymentService {
  processPayment(amount) {
    console.log(`处理付款金额: $${amount}`);
    return true; // 假设支付成功
  }
}

class ShippingService {
  shipOrder(orderDetails) {
    console.log(`订单发货至: ${orderDetails.address}`);
  }
}

// OrderService 依赖 PaymentService和ShippingService，创建订单时需要调用支付和发货服务
class OrderService {
  constructor(paymentService, shippingService) {
    this.paymentService = paymentService;
    this.shippingService = shippingService;
  }

  createOrder(amount, address) {
    console.log(`创建订单金额：$${amount}`);
    const paymentSuccess = this.paymentService.processPayment(amount);
    if (paymentSuccess) {
      console.log(`订单创建成功!`);
      this.shippingService.shipOrder({ address });
    } else {
      console.log(`付款失败。订单创建已中止!`);
    }
  }
}

// 创建一个 IoC 容器实例
const container = new Container();

container.register('paymentService', new PaymentService()); // 直接注册 PaymentService
container.register('shippingService', new ShippingService()); // 直接注册 ShippingService

container.register('orderService', (container) => {
  return new OrderService(
    container.get('paymentService'),
    container.get('shippingService')
  ); // 注入 PaymentService 和 ShippingService
});

// 从容器中获取 OrderService，并创建一个订单
const orderService1 = container.get('orderService');
orderService1.createOrder(200, '成都市天府三街');

const orderService2 = container.get('orderService');

console.log(orderService1 === orderService2); 
console.log(orderService1.paymentService === orderService2.paymentService); 