/**
 * 对应文档：方法装饰器 — 参数校验
 * 运行：npm run 09:method-validate
 */
import { validate } from "../decorators";

class UserService {
  @validate(
    (args) =>
      args.length > 0 && typeof args[0] === "string" && args[0].length > 0,
    "用户名必须是非空字符串"
  )
  createUser(username: string) {
    return `创建用户: ${username}`;
  }

  @validate(
    (args) =>
      args.length >= 2 &&
      typeof args[0] === "number" &&
      args[0] > 0 &&
      typeof args[1] === "string",
    "ID必须是正数，名称必须是字符串"
  )
  updateUser(id: number, name: string) {
    return `更新用户 ${id}: ${name}`;
  }
}

const userService = new UserService();
console.log(userService.createUser("Moment"));

try {
  userService.createUser("");
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
