import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import {
  InjectDataSource,
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  // TypeOrmModule.forRoot() 在 app.module.ts 里已配置，所以 @InjectDataSource() 可直接用，无需额外改 module。
  // 注入 DataSource 对象，可以创建 QueryBuilder 对象，并执行 SQL 查询。
  @InjectDataSource()
  private dataSource: DataSource;

  async create(createUserDto: CreateUserDto) {
    // const user = await this.entityManager.save(User, createUserDto);
    const user = await this.userRepository.save(createUserDto);
    return user;
  }

  async findAll(name: string, sex: string) {
    // return await this.entityManager.find(User);
    // return await this.userRepository.find({
      
    //   where: {
    //     name,
    //     sex,
    //   },
    // });

    // return this.userRepository
    // .createQueryBuilder('u')
    // .select(['u.id', 'u.name'])  // 只查 id 和 name
    // .addSelect('u.sex', 'gender')      // sex → gender
    // .addSelect('u.birthday', 'birth')  // birthday → birth
    // .where('u.name = :name or u.sex=:sex', { name, sex })
    // // .getMany();
    // .getRawMany();

    // Repository 方式 — 不需要 .from()
    // const users = await this.userRepository
    //   .createQueryBuilder('u')
    //   .where('u.name = :name or u.sex=:sex', { name, sex })
    //   .getMany();

    // DataSource 方式 — 必须 .from()，且必须 .select('u') 才能正确映射实体
    const users = await this.dataSource
      .createQueryBuilder()
      .select('u')
      .from(User, 'u')
      .where('u.name = :name or u.sex=:sex', { name, sex })
      .getMany();

    console.log('users', users);
    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number) {
    return await this.entityManager.findOneBy(User, { id });
    // return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.entityManager.save(User, { id, ...updateUserDto });
    // return await this.userRepository.save({ id, ...updateUserDto });
  }

  async remove(id: number) {
    return await this.entityManager.delete(User, { id });
    // return await this.userRepository.delete({ id });
  }
}
