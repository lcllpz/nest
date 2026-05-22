import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "u_name",
    length: 100,
  })
  name: string;

  @Column({
    name: "u_age",
  })
  age: number;

  @Column({ length: 11 })
  phone: string;

  @Column("text")
  desc: string;

  @Column("double", { default: 0 })
  other: number;
}
