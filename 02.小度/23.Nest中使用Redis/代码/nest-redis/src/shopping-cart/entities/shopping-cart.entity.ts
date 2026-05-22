import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  // 购物车数据，我们这里就简单保存购物车数量{count:1}
  @Column('json')
  cartData: Record<string, number>;
}
