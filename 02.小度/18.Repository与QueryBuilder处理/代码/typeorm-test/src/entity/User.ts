import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  age: number;

  @Column({ length: 11 })
  phone: string;

  @Column("text")
  desc: string;

  @Column("double", { default: 0 })
  other: number;
}
// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({
//     name: "u_name",
//     length: 100,
//   })
//   name: string;

//   @Column({
//     name: "u_nickname",
//     length: 100,
//   })
//   nickname: string;

//   @Column()
//   age: number;

//   @Column({ length: 11 })
//   phone: string;

//   @Column("text")
//   desc: string;

//   @Column("double", {
//     default: 0,
//   })
//   other: number;
// }
