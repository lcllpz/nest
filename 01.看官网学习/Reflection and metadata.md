https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata
总结：

1. guard 、 interceptor可以在内部访问在自定义装饰器上的数据
2. 使用：获取路由或者整个控制器的元数据：

```js
const isPublic =
  this.reflector.getAllAndOverride <
  boolean >
  (IS_PUBLIC_KEY,
  [
    // 提取当前正在处理的路由处理器对应的元数据
    context.getHandler(),
    // 获取控制器层面应用元数据
    context.getClass(),
  ]);
```

3. getAllAndOverride与getAllAndMerge的区别：

两者都用于从**多个目标**（通常是 `[context.getHandler(), context.getClass()]`）读取同一份元数据，区别在于如何处理「方法级」与「类级」同时存在的情况。

|          | getAllAndOverride                                               | getAllAndMerge                                     |
| -------- | --------------------------------------------------------------- | -------------------------------------------------- |
| 策略     | **覆盖**：按数组顺序依次查找，返回**第一个非 `undefined`** 的值 | **合并**：收集所有目标上的元数据，再合并成一份结果 |
| 典型场景 | 类上设默认，方法上特例覆盖（如 `@Public()`、`@Roles()`）        | 类与方法上的配置都要生效（如权限列表累加）         |
| 返回值   | `T \| undefined`                                                | 合并后的 `T`（无元数据时返回空数组）               |

**getAllAndOverride — 先找到谁用谁**

按参数顺序遍历，命中即返回，不再继续：

```typescript
// 方法在前 → 方法级优先，没有才回退到类级
this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
  context.getHandler(), // 先看方法
  context.getClass(), // 再看类
]);
```

```typescript
@Roles(["user"]) // 类级默认
class UsersController {
  @Roles(["admin"]) // 方法级覆盖
  delete() {}
}
// getAllAndOverride → ['admin']，不是 ['user', 'admin']
```

**getAllAndMerge — 全部合并**

从每个目标取出元数据，过滤 `undefined` 后合并：

- **数组**：`concat` 拼接 → `['user', 'admin']`
- **对象**：浅合并 `{ ...a, ...b }`，同名键以后者为准
- **其他类型**：包装成数组 `[a, b]`

```typescript
@Roles(["user"])
class UsersController {
  @Roles(["admin"])
  delete() {}
}
// getAllAndMerge → ['user', 'admin']
// 若需要去重或定优先级，合并后自行处理
```

**怎么选**

- 布尔开关、单一配置（是否公开、是否跳过拦截器）→ 用 `getAllAndOverride`
- 列表、对象等需要「叠加」而非「替换」→ 用 `getAllAndMerge`

代码没验证：
