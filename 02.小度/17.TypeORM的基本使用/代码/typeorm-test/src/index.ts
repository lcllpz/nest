import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    console.log("数据库连接成功");
    // const user1 = new User();
    // user1.name = "Jack";
    // user1.age = 18;
    // user1.phone = "12345678902";
    // user1.desc = "Hello World2!";
    // user1.other = 1.113;
    // // 插入数据
    // await AppDataSource.manager.save(user1);

    // const user2 = new User();
    // user2.name = "Rose";
    // user2.age = 20;
    // user2.phone = "12345678903";
    // user2.desc = "Hello World3!";
    // user2.other = 1.13;
    // // 插入数据
    // await AppDataSource.manager.save(user2);

    // 查询所有user表数据
    const users = await AppDataSource.manager.find(User);
    console.log("查询所有user表数据:", users, typeof users);

    // 查询id为2的用户数据
    const user = await AppDataSource.manager.findOneBy(User, { id: 2 });
    console.log("查询的用户信息：", user, typeof user);

    user.name = "Tom1";
    await AppDataSource.manager.save(user);
    console.log("修改之后的用户信息：", user, typeof user);
  })
  .catch((error) => console.log(error));
