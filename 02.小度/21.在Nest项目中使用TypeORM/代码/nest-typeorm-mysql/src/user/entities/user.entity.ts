import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
 
  @Column()
  sex: string;

  @Column({
    type: 'timestamp',
    transformer: {
      to: (value: string | Date): Date => {
        if (typeof value === 'string') {
          return new Date(`${value}T00:00:00.000Z`);
        }
        return value;
      },
      from: (value: Date): Date => {
        return value;
      },
    },
  })
  birthday: Date;
}
