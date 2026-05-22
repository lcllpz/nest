import { AppDataSource } from "./data-source";
import { Department } from "./entity/Department";
import { Employee } from "./entity/Employee";
import { IdCard } from "./entity/IdCard";
import { Order } from "./entity/Order";
import { Product } from "./entity/Product";
import { User } from "./entity/User";

// 表关系处理 多对多
async function main() { 
  await AppDataSource.initialize();

  const order1 = new Order();
  order1.name = "订单1";
  const order2 = new Order();
  order2.name = "订单2";

  const product1 = new Product();
  product1.name = "产品1";
  const product2 = new Product();
  product2.name = "产品2";
  const product3 = new Product();
  product3.name = "产品3";
  const product4 = new Product();
  product4.name = "产品4";

  order1.products = [product1, product2, product3];
  order2.products = [product1, product2, product3, product4];
  
  const orderRepository = AppDataSource.getRepository(Order);
  await orderRepository.save(order1);
  await orderRepository.save(order2);

}
main();

/*
// 表关系处理 一对多/多对一
async function main() { 
  await AppDataSource.initialize();

  const depart = new Department();
  depart.name = "技术部";
  depart.desc = "技术部门";

  const emp1 = new Employee();
  emp1.name = "员工1";

  const emp2 = new Employee();
  emp2.name = "员工2";

  depart.employees = [emp1, emp2];

  const departmentRepository = AppDataSource.getRepository(Department);
  const result = await departmentRepository.save(depart);
  console.log(result);

}
main();
*/

/*
// 表关系处理 一对一
async function main() {
  await AppDataSource.initialize();
  // const user = new User();
  // user.name = "韩梅梅";
  // user.age = 18;
  // user.phone = "12345678900";
  // user.desc = "Hello World!";
  // user.other = 1.1;

  // const idCard = new IdCard();
  // idCard.cardNo = "123456789012345678";
  // idCard.name = "韩梅梅";
  // idCard.address = "北京市朝阳区";
  // idCard.birthday = new Date("1990-01-01");
  // idCard.email = "hmm1990@163.com";
  // // 关联两个实体
  // idCard.user = user;

  // // 获取Repository
  // const userRepository = AppDataSource.getRepository(User);
  // const idCardRepository = AppDataSource.getRepository(IdCard);

  // // 依次保存
  // await userRepository.save(user);
  // console.log('保存用户信息成功---', user);

  // await idCardRepository.save(idCard);
  // console.log('保存身份证信息成功---', idCard);

  // 查询，由于现在只是idCard关联了user，所以要关联查询，需要通过idCard处理
  // const idCardRepository = AppDataSource.getRepository(IdCard);
  // const idCards = await idCardRepository.find({ relations: { user: true } });
  // console.log('查询所有idCard信息---', idCards);

  // 双向关联之后，通过user也可以关联查询出idCard信息
  // const userRepository = AppDataSource.getRepository(User);
  // const users = await userRepository.find({ relations: { card: true } });
  // console.log('查询所有user信息---', users);

  // 新增用户信息，级联的保存idCard信息
  // const user = new User();
  // user.name = "李雷";
  // user.age = 20;
  // user.phone = "12345678901";
  // user.desc = "Hello World!";
  // user.other = 1.2;

  // const idCard = new IdCard();
  // idCard.cardNo = "123456789012345679";
  // idCard.name = "李雷";
  // idCard.address = "北京市朝阳区";
  // idCard.birthday = new Date("1990-01-01");
  // idCard.email = "lilei1990@163.com";

  // // 注意需要关联起来
  // user.card = idCard;

  // const userRepository = AppDataSource.getRepository(User);
  // await userRepository.save(user);
  // console.log('保存用户信息成功---', user);

  // 级联更新
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: 1 },
    relations: {card: true},
  })

  // console.log('user', user);

  user.name = 'lucy';
  user.age = 22;
  user.card.name = 'lucy';
  user.card.cardNo = '123456789012345678';
  user.card.address = '成都武侯区';
  user.card.birthday = new Date('2000-01-01');
  user.card.email = 'lucy2000@163.com';

  const result = await userRepository.save(user);
  console.log(result);
}

main();
*/

/*
async function main() {
  await AppDataSource.initialize();
  // 直接通过AppDataSource创建QueryBuilder
  // const user = await AppDataSource.createQueryBuilder()
  //   .select("user")
  //   .from(User, "user")
  //   .where("user.id=:id", { id: 1 })
  //   .getOne();
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
  // const queryBuilder = AppDataSource.createQueryBuilder();
  // const result1 = await queryBuilder.insert().into(User).values(user1).execute();
  // const result2 = await queryBuilder.insert().into(User).values(user2).execute();
  // console.log("新增数据---", result);

  // 查询全部数据
  // const queryBuilder = AppDataSource.createQueryBuilder();
  // // const users = await queryBuilder.select("user").from(User, "user").getMany();
  // // console.log('查询所有数据---', users);

  // // 查询数据库原始字段内容
  // const users = await queryBuilder.select().from(User, "user").getRawMany();
  // console.log('查询所有数据---', users);

  // 查询并修改
  // const queryBuilder = AppDataSource.createQueryBuilder();
  // const user = await queryBuilder
  //   .select("u")
  //   .from(User, "u")
  //   .where("u.id=:id", { id: 7 })
  //   .getOne();
  // console.log("查询id=7的用户数据---", user);

  // user.name = "lucy";
  // user.age = 32;
  // user.phone = "12345678966";

  // const result = await queryBuilder
  //   .update(User)
  //   .set(user)
  //   .where("id=:id", { id: 7 })
  //   .execute();
  
  // console.log('更新成功---', result);

  // 删除
  const queryBuilder = AppDataSource.createQueryBuilder();
  const result = await queryBuilder.delete().from(User).where("id=:id", { id: 8 }).execute();
  console.log('删除成功---', result);
}
main();
*/

/*
async function main() { 
  await AppDataSource.initialize();
  const userRepository = AppDataSource.getRepository(User);
  
  // const user1 = new User();
  // user1.name = "张三";
  // user1.age = 18;
  // user1.phone = "12345678933";
  // user1.desc = "Hello World zs!";
  // user1.other = 1.1;

  // await userRepository.save(user1);
  // console.log('新增成功---', user1);

  // const user2 = new User();
  // user2.name = "李四";
  // user2.age = 18;
  // user2.phone = "12345678944";
  // user2.desc = "Hello World ls!";
  // user2.other = 1.2;

  // await userRepository.save(user2);
  // console.log('新增成功---', user2);

  // const users = await userRepository.find();
  // console.log('查询所有用户信息---', users);

  // const user = await userRepository.findOneBy({id: 2});
  // console.log('查询id=2的用户信息---', user);

  // user.name = 'Jack';
  // user.age = 18;
  // await userRepository.save(user);
  // console.log('更新成功---', user);

  const userDelete = await userRepository.findOneBy({id: 5});
  await userRepository.delete(userDelete);
  console.log('删除成功');
}
main();
*/

/*
AppDataSource.initialize()
  .then(async () => {
    // const user1 = new User();
    // user1.name = "Jack";
    // user1.age = 18;
    // user1.phone = "12345678902";
    // user1.desc = "Hello World2!";
    // user1.other = 1.113;

    // // 插入数据
    // await AppDataSource.manager.save(user1);
    // console.log(`User has been saved --- userid:` + user1.id);

    // const user2 = new User();
    // user2.name = "Rose";
    // user2.age = 20;
    // user2.phone = "12345678903";
    // user2.desc = "Hello World3!";
    // user2.other = 1.13;

    // // 插入数据
    // await AppDataSource.manager.save(user2);
    // console.log(`User has been saved --- userid:` + user2.id);

    // 查询所有user表数据
    // const users = await AppDataSource.manager.find(User);
    // console.log("查询所有user表数据:", users);

    // 查询id为2的用户数据
    const user = await AppDataSource.manager.findOneBy(User, { id: 2 });
    console.log("查询的用户信息：", user);

    user.name = "Tom";
    user.age = 22;

    await AppDataSource.manager.save(user);
    console.log("修改之后的用户信息：", user)

  })
  .catch((error) => console.log(error));
*/
