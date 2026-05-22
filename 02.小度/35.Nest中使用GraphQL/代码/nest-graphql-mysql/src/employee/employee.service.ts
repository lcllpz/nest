import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  @InjectRepository(Employee)
  private employeeRepository: Repository<Employee>;

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }
}
