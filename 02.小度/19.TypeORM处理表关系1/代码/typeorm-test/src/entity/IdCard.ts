import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class IdCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 18 })
  cardNo: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  birthday: Date;

  @Column()
  email: string;

  @OneToOne(() => User, (user) => user.card)
  @JoinColumn()
  user: User;
}
