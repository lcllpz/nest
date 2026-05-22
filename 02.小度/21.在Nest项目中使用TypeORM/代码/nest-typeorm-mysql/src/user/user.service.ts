import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  // @InjectEntityManager()
  // private entityManager: EntityManager;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto) {
    // const user = await this.entityManager.save(User, createUserDto);
    const user = await this.userRepository.save(createUserDto);
    console.log('---user---', user);
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

    return this.userRepository
      .createQueryBuilder('u')
      .where('u.name = :name or u.sex=:sex', { name, sex })
      .getMany();
  }

  async findOne(id: number) {
    // return await this.entityManager.findOneBy(User, { id });
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // return await this.entityManager.save(User, { id, ...updateUserDto });
    return await this.userRepository.save({ id, ...updateUserDto });
  }

  async remove(id: number) {
    // return await this.entityManager.delete(User, { id });
    return await this.userRepository.delete({ id });
  }
}
