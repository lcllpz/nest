import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { IdCard } from "./IdCard";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column()
  age: number;

  @Column({ length: 11 })
  phone: string;

  @Column("text")
  desc: string;

  @Column("double", { default: 0 })
  other: number;

  @OneToOne(() => IdCard, (idCard) => idCard.user, {
    cascade: true,
  })
  card: IdCard;
}
