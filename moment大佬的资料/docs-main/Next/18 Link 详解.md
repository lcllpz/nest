Next.js 内置的 `<Link>` 组件在 HTML `<a>` 基础上实现了客户端路由导航和智能预加载，使页面切换更快、更平滑。相比传统 `<a>` 标签会触发完整刷新，`<Link>` 通过客户端路由实现无缝跳转，并支持视口内链接的自动预加载。

下图对比了传统链接与 Next.js Link 的差异：

![20260206204755](https://raw.githubusercontent.com/xun082/md/main/blogs.images20260206204755.png)

传统 `<a>` 会触发完整刷新并重新加载资源，而 Link 通过客户端路由实现快速切换，支持智能预加载，并保持应用状态。

## Link 组件介绍

`<Link>` 基于 HTML `<a>` 扩展，提供预加载和客户端路由导航，是 Next.js 中实现页面跳转的主要方式：

```tsx
// app/page.tsx
import Link from "next/link";

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>;
}
```

上述示例中，`href` 指定跳转路径，Link 会渲染为可点击的 `<a>` 元素，点击后通过客户端路由导航，无需整页刷新。

## Props 属性

Link 支持的常用属性如下，其他 HTML `<a>` 属性会透传到底层元素：

| Prop       | 示例                | 类型             | 是否必须 |
| ---------- | ------------------- | ---------------- | -------- |
| `href`     | `href="/dashboard"` | String or Object | 是       |
| `replace`  | `replace={false}`   | Boolean          | -        |
| `scroll`   | `scroll={false}`    | Boolean          | -        |
| `prefetch` | `prefetch={false}`  | Boolean          | -        |

## href 属性

`href` 指定跳转路径或 URL，支持字符串或对象。

字符串形式最常用：

```tsx
<Link href="/dashboard">Dashboard</Link>
```

对象形式可携带 pathname、query 等，便于构建带查询参数的 URL。例如导航至 `/about?name=test`：

```tsx
<Link href={{ pathname: "/about", query: { name: "test" } }}>About</Link>
```

对象类型遵循 Node.js 的 [url 模块](https://nodejs.org/api/url.html) 规范。以 `http://user:pass@host.com:8080/p/a/t/h?query=string#hash` 为例，支持的属性包括：

- `href`：`'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'`
- `protocol`：`'http:'`
- `host`：`'host.com:8080'`
- `auth`：`'user:pass'`
- `hostname`：`'host.com'`
- `port`：`'8080'`
- `pathname`：`'/p/a/t/h'`
- `search`：`'?query=string'`
- `path`：`'/p/a/t/h?query=string'`
- `query`：`'query=string'` 或 `{ query: 'string' }`
- `hash`：`'#hash'`

## replace 属性

默认 `false`。为 `true` 时，使用 `history.replaceState` 替换当前历史记录，而非新增一条，用户无法通过后退返回上一页。适用于登录跳转等场景。

下图展示 `replace` 的工作原理：

![20260206205055](https://raw.githubusercontent.com/xun082/md/main/blogs.images20260206205055.png)

图中左侧为默认行为：历史记录新增一条，用户可后退；右侧为 `replace={true}` 时：当前记录被替换，无法返回。使用方式如下：

```tsx
<Link href="/dashboard" replace>
  Dashboard
</Link>
```

## scroll 属性

默认 `true`。导航后会自动滚动到新页面顶部，或在前进/后退时恢复之前的滚动位置。设为 `false` 时，导航后不滚动，保持当前视口位置，适用于锚点、弹窗内导航等场景：

```tsx
<Link href="/dashboard" scroll={false}>
  Dashboard
</Link>
```

## prefetch 属性

默认 `true`。视口内的 `<Link>`（包括初始加载或滚动进入视口）会在后台预获取目标页面资源，提升点击后的导航速度。预获取仅在生产环境生效。

下图展示预加载流程：

![20260206205128](https://raw.githubusercontent.com/xun082/md/main/blogs.images20260206205128.png)

开启 prefetch 时，资源会提前下载并缓存，点击后即可快速加载；关闭时则需等待首次点击才开始请求。通过 `prefetch={false}` 可禁用预加载：

```tsx
<Link href="/dashboard" prefetch={false}>
  Dashboard
</Link>
```

## 其他 props

除 Link 自有属性外，`target`、`className`、`rel`、`aria-*` 等会原样透传给底层 `<a>`，便于自定义样式或实现新窗口打开（`target="_blank"`）等行为。

## 使用示例

本节展示动态路由与中间件两种常见场景的用法。

### 链接至动态路由

App Router 中，`href` 直接写目标路径即可，动态段用模板字符串拼接：

```tsx
// app/blog/page.tsx
import Link from "next/link";

interface Post {
  id: string;
  slug: string;
  title: string;
}

export default function Page({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
```

视口内的链接会自动预加载对应页面，点击即可快速跳转。

### 与中间件配合

中间件可对请求做鉴权、重定向或重写。当同一路径根据认证状态重写至不同目标时，预加载行为需与最终跳转一致。

下图左侧为请求流程，右侧为 Link 预加载流程，两者都依赖认证状态：

![20260206205325](https://raw.githubusercontent.com/xun082/md/main/blogs.images20260206205325.png)

通常直接使用 `href="/dashboard"` 即可：预请求会经中间件重写，拿到正确内容。若需在客户端根据认证状态预加载不同路由，可动态设置 `href`：

```tsx
// middleware.ts
import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const url = new URL(request.url);
  if (url.pathname === "/dashboard") {
    const hasAuth = request.cookies.has("authToken");
    const target = hasAuth ? "/auth/dashboard" : "/public/dashboard";
    return NextResponse.rewrite(new URL(target, request.url));
  }
  return NextResponse.next();
}
```

```tsx
// 客户端已知认证状态时，可据此设置 href 以预加载正确目标
import Link from "next/link";
import { useIsAuthed } from "./hooks/useIsAuthed";

export default function Page() {
  const isAuthed = useIsAuthed();
  const href = isAuthed ? "/auth/dashboard" : "/public/dashboard";
  return <Link href={href}>Dashboard</Link>;
}
```

## 总结

Link 的核心在于：用 `href` 指定跳转路径，保持 `prefetch` 开启以预加载视口内链接，按需使用 `replace` 和 `scroll` 控制历史与滚动行为。掌握这些即可应对大部分导航场景。

## 参考链接

1. [Components: Link](https://nextjs.org/docs/app/api-reference/components/link)
2. [Linking and Navigating](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating)
