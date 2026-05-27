import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

// 使用Repository操作CRUD
// async function main() {
//   await AppDataSource.initialize();
//   const userRepository = AppDataSource.getRepository(User);

//   //   // const user1 = new User();
//   //   // user1.name = "张三";
//   //   // user1.age = 18;
//   //   // user1.phone = "12345678933";
//   //   // user1.desc = "Hello World zs!";
//   //   // user1.other = 1.1;
//   //   // await userRepository.save(user1);

//   //   // const user2 = new User();
//   //   // user2.name = "李四";
//   //   // user2.age = 18;
//   //   // user2.phone = "12345678944";
//   //   // user2.desc = "Hello World ls!";
//   //   // user2.other = 1.2;
//   //   // await userRepository.save(user2);

//   //   // const users = await userRepository.find();
//   //   // console.log("查询所有用户信息---", users);
//   // const users = await userRepository.find({where: {id: 1}});
//   //   // const user = await userRepository.findOneBy({ id: 2 });
//   //   // console.log("查询id=2的用户信息---", user);

//   //   // user.name = 'Jack';
//   //   // user.age = 18;
//   //   // await userRepository.save(user);
//   //   // console.log('更新成功---', user);

//   //   // const userDelete = await userRepository.findOneBy({ id: 5 });
//   //   // await userRepository.delete(userDelete);
//   //   // console.log("删除成功");
// }

// async function main() {
// 使用实体管理器操作数据库
// AppDataSource.initialize()
//   .then(async () => {
//     // const user1 = new User();
//     // user1.name = "Jack";
//     // user1.age = 18;
//     // user1.phone = "12345678902";
//     // user1.desc = "Hello World2!";
//     // user1.other = 1.113;

//     // // 插入数据
//     // await AppDataSource.manager.save(user1);
//     // console.log(`User has been saved --- userid:` + user1.id);

//     // const user2 = new User();
//     // user2.name = "Rose";
//     // user2.age = 20;
//     // user2.phone = "12345678903";
//     // user2.desc = "Hello World3!";
//     // user2.other = 1.13;

//     // // 插入数据
//     // await AppDataSource.manager.save(user2);
//     // console.log(`User has been saved --- userid:` + user2.id);

//     // 查询所有user表数据
//     // const users = await AppDataSource.manager.find(User);
//     // console.log("查询所有user表数据:", users);

//     // 查询id为2的用户数据
//     const user = await AppDataSource.manager.findOneBy(User, { id: 2 });
//     console.log("查询的用户信息：", user);

//     user.name = "Tom";
//     user.age = 22;

//     await AppDataSource.manager.save(user);
//     console.log("修改之后的用户信息：", user)

//   })
//   .catch((error) => console.log(error));

async function main() {
  await AppDataSource.initialize();
  // 直接通过AppDataSource创建QueryBuilder
  // const user = await AppDataSource.createQueryBuilder()
  //   // .select("user")
  //   // .select(["user.id", "user.name", "user.age"])
  //   .select("user.id", "ids")
  //   .addSelect("user.name", "name")
  //   .addSelect("user.age", "age")
  //   .from(User, "user")
  //   .where("user.id=:id", { id: 6 })
  //   .getRawOne();
  // console.log(user);

  // 通过Repository创建QueryBuilder
  // const user = await AppDataSource.getRepository(User)
  //   .createQueryBuilder("user")
  //   .where("user.id=:id", { id: 1 })
  //   .getOne();
  // console.log(user);

  // 通过EntityManager创建QueryBuilder
  // const user = await AppDataSource.manager
  //   .createQueryBuilder(User, "user")
  //   .where("user.id=:id", { id: 1 })
  //   .getOne();
  // console.log(user);

  // 新增
  const user1 = new User();
  user1.name = "lily";
  user1.age = 30;
  user1.phone = "12345678955";
  user1.desc = "Hello World5!";
  user1.other = 1.1134;

  // const user2 = new User();
  // user2.name = "tom";
  // user2.age = 31;
  // user2.phone = "12345678955";
  // user2.desc = "Hello World5!";
  // user2.other = 1.1134;

  const queryBuilder = AppDataSource.createQueryBuilder();
  const result1 = await queryBuilder
    .insert()
    .into(User)
    .values(user1)
    .execute();
  // const result2 = await queryBuilder.insert().into(User).values(user2).execute();
  // console.log("新增数据---", result);

  // 查询全部数据
  // const queryBuilder = AppDataSource.createQueryBuilder();
  // // const users = await queryBuilder.select("user").from(User, "user").getMany();
  // // console.log('查询所有数据---', users);

  // // 查询数据库原始字段内容
  // const users = await queryBuilder.select().from(User, "user").getRawMany();
  // console.log("查询所有数据---", users);

  // 查询并修改
  // const queryBuilder = AppDataSource.createQueryBuilder();
  const user = await queryBuilder
    .select("u")
    .from(User, "u")
    .where("u.id=:id", { id: 7 })
    .getOne();
  console.log("查询id=7的用户数据---", user);

  user.name = "lucy";
  user.age = 32;
  user.phone = "12345678966";

  const result = await queryBuilder
    .update(User)
    .set(user)
    .where("id=:id", { id: 7 })
    .execute();

  console.log("更新成功---", result);

  // 删除
  // const queryBuilder = AppDataSource.createQueryBuilder();
  // const result = await queryBuilder.delete().from(User).where("id=:id", { id: 8 }).execute();
  // console.log('删除成功---', result);
}

main();
