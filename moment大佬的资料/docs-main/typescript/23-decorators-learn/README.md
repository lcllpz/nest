# TypeScript 装饰器学习项目

配合章节：[23. 装饰器.md](../23.%20装饰器.md)

## 快速开始

```bash
cd 23-decorators-learn
npm install
npm run 01:class-basic
```

每个示例都有独立脚本，改代码后重新运行对应命令即可观察输出。

## 项目结构

```
23-decorators-learn/
├── src/
│   ├── decorators/          # 可复用的装饰器实现（对照文档阅读）
│   │   ├── class.ts         # 类装饰器
│   │   ├── method.ts        # 方法装饰器
│   │   ├── accessor.ts      # 访问器装饰器
│   │   ├── property.ts      # 属性装饰器
│   │   └── parameter.ts     # 参数装饰器
│   ├── di/                  # 依赖注入示例（文档综合实战）
│   │   ├── container.ts
│   │   └── decorators.ts
│   └── examples/            # 按文档顺序的 runnable 示例
└── tsconfig.json            # 已开启 experimentalDecorators + emitDecoratorMetadata
```

## 学习路线（与文档章节对应）

| 命令 | 文档内容 |
|------|----------|
| `npm run 01:class-basic` | 类装饰器基础 |
| `npm run 02:class-add-properties` | 在原型上添加属性/方法 |
| `npm run 03:class-replace` | 返回新构造函数替换类 |
| `npm run 04:class-monitor` | 监控实例化 |
| `npm run 05:class-singleton` | 单例模式 |
| `npm run 06:class-mixins` | Mixins 混入 |
| `npm run 07:class-timing` | 类定义时执行（非实例化时） |
| `npm run 08:method-log` | 方法装饰器与 descriptor |
| `npm run 09:method-validate` | 方法参数校验 |
| `npm run 10:accessor` | 访问器装饰器 |
| `npm run 11:property` | 属性装饰器 |
| `npm run 12:parameter` | 参数装饰器 |
| `npm run 13:execution-order` | 装饰器执行顺序 |
| `npm run 14:dependency-injection` | 依赖注入综合示例 |

## 学习建议

1. 先读 `src/decorators/` 里对应类型的实现，再运行 `examples/` 里同名序号的文件。
2. 在示例里加 `console.log`、改装饰器逻辑，对比输出加深理解。
3. 第 14 个示例依赖 `reflect-metadata`，与 NestJS 的 `@Injectable()`、`@Inject()` 思路一致，学完可继续看 `nestjs/10. 装饰器和元数据.md`。

## tsconfig 要点

```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

- `experimentalDecorators`：启用装饰器语法。
- `emitDecoratorMetadata`：为 DI 等场景生成 `design:type` 等元数据（需配合 `reflect-metadata`）。

## 装饰器执行顺序（速记）

定义类时（非调用时）自下而上、由细到粗：

1. 属性装饰器  
2. 参数装饰器（同一方法内从右到左）  
3. 方法装饰器  
4. 访问器装饰器  
5. 类装饰器  

运行 `npm run 13:execution-order` 可在控制台看到完整顺序。
