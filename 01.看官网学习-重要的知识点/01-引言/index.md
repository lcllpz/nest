## 1. 核心理念

- 底层实现上，Nest 利用了诸如 Express（默认选项）等强大的 HTTP 服务器框架，并可选配配置为使用 Fastify！
- `Nest 在这些常见的 Node.js 框架（Express/Fastify）之上提供了一层抽象层`，但同时也直接向开发者暴露了这些框架的 API。这使得开发者能够自由使用为底层平台提供的大量第三方模块。

## 2. 核心理念

1. Nest 提供了一套开箱即用的应用架构，使开发者和团队能够构建出高度可测试、可扩展、松耦合且易于维护的应用程序。该架构深受 Angular 的启发。
2. Nest致力于成为一个平台无关的框架。平台独立性使得开发者能够创建可复用的逻辑组件，并在多种不同类型的应用程序中加以利用。从技术层面而言，一旦创建适配器，Nest即可与任何Node HTTP框架协同工作。目前开箱即支持两种HTTP平台：Express 和 Fastify。您可以根据自身需求选择最合适的方案。

```js
platform-express:
Express 是一个广为人知的Node轻量级Web框架。它是一个经过实战检验、可直接投入生产的库，并拥有社区贡献的大量资源。系统默认使用@nestjs/platform-express 包。许多用户已能良好使用Express，无需额外配置即可启用该框架。
platform-fastify:
Fastify 是一个高性能、低开销的框架，其核心设计理念是提供极致的效率与速度。

```

## 参考文档

- 引言： https://docs.nestjs.com/
- https://docs.nestjs.com/first-steps
