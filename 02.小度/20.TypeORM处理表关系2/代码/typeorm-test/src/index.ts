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

  // const order1 = new Order();
  // order1.name = "订单1";
  // const order2 = new Order();
  // order2.name = "订单2";

  // const product1 = new Product();
  // product1.name = "产品1";
  // const product2 = new Product();
  // product2.name = "产品2";
  // const product3 = new Product();
  // product3.name = "产品3";
  // const product4 = new Product();
  // product4.name = "产品4";

  // order1.products = [product1, product2, product3];
  // order2.products = [product1, product2, product3, product4];

  // const orderRepository = AppDataSource.getRepository(Order);
  // await orderRepository.save(order1);
  // await orderRepository.save(order2);

  // const queryBuilder = AppDataSource.createQueryBuilder();
  // await queryBuilder.insert().into(Order).values(order1).execute();
  // await queryBuilder.insert().into(Order).values(order2).execute();

  const queryBuilder = AppDataSource.createQueryBuilder();
  const result = await queryBuilder
    .select("order")
    .from(Order, "order")
    .leftJoinAndSelect("order.products", "product")
    .where("order.id = :id", { id: 1 })
    .getOne();
  console.log(JSON.stringify(result, null, 2));
}

//   // const departmentRepository = AppDataSource.createQueryBuilder();
//   // const result = await departmentRepository
//   //   .select(["department.id", "department.name", "employee.id"])
//   //   .addSelect("employee.name", "employeeName")
//   //   .from(Department, "department")
//   //   .leftJoinAndSelect("department.employees", "employee")
//   //   .where("department.id = :id AND employee.name = :name", {
//   //     id: 1,
//   //     name: "员工1",
//   //   })
//   //   .getRawMany();
//   // // console.log("--->", result.employees[0]);
//   // console.log("--->", result);

//   const departmentRepository = AppDataSource.createQueryBuilder();
//   const result = await departmentRepository
//     .select([
//       "department.id",
//       "department.name",
//       "employee.id",
//       "employee.name",
//     ])
//     .from(Department, "department")
//     .leftJoinAndSelect(
//       "department.employees",
//       "employee",
//       "employee.name = :name",
//       { name: "员工1" },
//     )
//     .where("department.id = :id", { id: 1 })
//     .getMany();
//   console.log("--->", JSON.stringify(result, null, 2));
// }

main();
