import { AppDataSource } from "./data-source";
import { IdCard } from "./entity/IdCard";
import { User } from "./entity/User";

// 表关系处理
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

  // // // 获取Repository
  // const userRepository1 = AppDataSource.getRepository(User);
  // const idCardRepository = AppDataSource.getRepository(IdCard);

  // // // 依次保存
  // await userRepository1.save(user);
  // await idCardRepository.save(idCard);

  // 查询，由于现在只是idCard关联了user，所以要关联查询，需要通过idCard处理
  // const idCardRepository = AppDataSource.getRepository(IdCard);
  // const idCards = await idCardRepository.find({ relations: { user: true } });
  // console.log("查询所有idCard信息---", idCards);
  // const idCards = await AppDataSource.createQueryBuilder()
  //   .select("idCard")
  //   .from(IdCard, "idCard")
  //   .leftJoinAndSelect("idCard.user", "user")
  //   .getMany();
  // console.log("查询所有idCard信息---", idCards);

  // 双向关联之后，通过user也可以关联查询出idCard信息
  // const userRepository = AppDataSource.getRepository(User);
  // const users = await userRepository.find({ relations: { card: true } });
  // console.log("查询所有user信息---", users);

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

  // 级联更新
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: 3 },
    relations: { card: true },
  });
  user.name = "lucy";
  user.age = 22;
  user.card.name = "lucy";

  const result = await userRepository.save(user);
  console.log(result);
}

main();
