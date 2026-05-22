/**
 * 对应文档：依赖注入（类 / 属性 / 参数 / 方法装饰器 + reflect-metadata）
 * 运行：npm run 14:dependency-injection
 */
import "reflect-metadata";
import { DIContainer, Lifecycle } from "../di/container";
import {
  Service,
  Inject,
  InjectParam,
  InjectMethod,
  InjectMethodParam,
} from "../di/decorators";

interface ILogger {
  log(message: string): void;
  error(message: string): void;
}

const SERVICE_TOKENS = {
  LOGGER: Symbol("Logger"),
  CONFIG: Symbol("Config"),
  DATABASE: Symbol("Database"),
  USER_SERVICE: Symbol("UserService"),
  CURRENT_USER: Symbol("CurrentUser"),
};

@Service(SERVICE_TOKENS.LOGGER)
class Logger implements ILogger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
  error(message: string): void {
    console.error(`[ERROR] ${message}`);
  }
}

@Service(SERVICE_TOKENS.CONFIG)
class ConfigService {
  private config: Record<string, unknown> = {
    apiUrl: "https://api.moment.com",
    timeout: 5000,
    maxRetries: 3,
  };
  get(key: string): unknown {
    return this.config[key];
  }
}

@Service(SERVICE_TOKENS.DATABASE)
class DatabaseService {
  constructor(
    @InjectParam(SERVICE_TOKENS.CONFIG) private config: ConfigService
  ) {
    console.log(`数据库服务初始化，API URL: ${config.get("apiUrl")}`);
  }
  query(sql: string): { id: number; name: string }[] {
    console.log(`执行查询: ${sql}`);
    return [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
  }
  execute(sql: string): void {
    console.log(`执行命令: ${sql}`);
  }
}

@Service(SERVICE_TOKENS.USER_SERVICE)
class UserService {
  @Inject(SERVICE_TOKENS.LOGGER)
  private logger!: ILogger;

  @Inject(SERVICE_TOKENS.DATABASE)
  private db!: DatabaseService;

  constructor(
    @InjectParam(SERVICE_TOKENS.CONFIG) private config: ConfigService
  ) {
    console.log("用户服务初始化");
  }

  getUsers() {
    this.logger.log("获取用户列表");
    return this.db.query("SELECT * FROM users");
  }

  createUser(username: string, email: string) {
    this.logger.log(`创建用户: ${username}, ${email}`);
    this.db.execute(
      `INSERT INTO users (username, email) VALUES ('${username}', '${email}')`
    );
    return { id: 3, username, email };
  }

  @InjectMethod()
  processUserData(
    data: unknown,
    @InjectMethodParam(SERVICE_TOKENS.LOGGER) logger?: ILogger
  ): void {
    logger?.log(`处理用户数据: ${JSON.stringify(data)}`);
  }
}

class AppController {
  @Inject(SERVICE_TOKENS.USER_SERVICE)
  private userService!: UserService;

  @Inject(SERVICE_TOKENS.LOGGER)
  private logger!: ILogger;

  initialize(): void {
    this.logger.log("应用初始化");
    const users = this.userService.getUsers();
    console.log("用户列表:", users);
    const newUser = this.userService.createUser("john_doe", "john@example.com");
    console.log("新用户:", newUser);
    this.userService.processUserData({ name: "处理数据" });
  }
}

const container = DIContainer.getInstance();
container.registerFactory(
  SERVICE_TOKENS.CURRENT_USER,
  () => ({ id: 1, username: "admin", roles: ["ADMIN"] }),
  Lifecycle.SINGLETON
);

console.log("\n--- 启动应用 ---\n");
const appController = new AppController();
appController.initialize();
