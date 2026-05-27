import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose({ name: 'id' })
  userId: number;

  @Expose({ name: 'name' })
  userName: string;

  @Expose({ name: 'sex' })
  gender: string;

  @Expose({ name: 'birthday' })
  birth: Date;
}
