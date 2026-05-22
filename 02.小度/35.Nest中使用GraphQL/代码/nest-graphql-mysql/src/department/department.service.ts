import { Injectable } from '@nestjs/common';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentService {
  @InjectRepository(Department)
  private departmentRepository: Repository<Department>;

  async init() {
    const department1 = new Department();
    department1.name = '技术部';

    const department2 = new Department();
    department2.name = '财务部';

    const employee1 = new Employee();
    employee1.name = '张三';
    employee1.age = 25;
    employee1.sex = '男';
    employee1.department = department1;

    const employee2 = new Employee();
    employee2.name = '李四';
    employee2.age = 25;
    employee2.sex = '男';
    employee2.department = department1;

    const employee3 = new Employee();
    employee3.name = '王五';
    employee3.age = 25;
    employee3.sex = '男';
    employee3.department = department1;

    const employee4 = new Employee();
    employee4.name = '赵六';
    employee4.age = 25;
    employee4.sex = '男';
    employee4.department = department2;

    const employee5 = new Employee();
    employee5.name = '冯七';
    employee5.age = 25;
    employee5.sex = '女';
    employee5.department = department2;

    department1.employees = [employee1, employee2, employee3];
    department2.employees = [employee4, employee5];

    await this.departmentRepository.save(department1);
    await this.departmentRepository.save(department2);
  }

  async findAll(): Promise<Department[]> {
    return await this.departmentRepository.find({
      relations: {
        employees: true,
      },
    });
  }

  async findOne(id: number): Promise<Department> {
    return await this.departmentRepository.findOneBy({ id });
  }

  async create(department: CreateDepartmentDto): Promise<Department> {
    return await this.departmentRepository.save(department);
  }
}
