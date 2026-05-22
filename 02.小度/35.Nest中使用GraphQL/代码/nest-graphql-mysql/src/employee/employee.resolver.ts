import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './input/create-employee.input';

@Resolver()
export class EmployeeResolver {
  @InjectEntityManager()
  private employeeEntityManager: EntityManager;

  @Query('employees')
  async getEmployees() {
    const employees = await this.employeeEntityManager.find(Employee, {
      relations: {
        department: true,
      },
    });
    console.log(employees);
    return employees;
  }

  @Query('employeesByDepartmentName')
  async getEmployeesByDepartmentName(@Args('name') name: string) {
    return await this.employeeEntityManager.find(Employee, {
      where: {
        department: {
          name,
        },
      },
    });
  }

  @Mutation('addEmployee')
  async addEmployee(@Args('input') input: CreateEmployeeInput) {
    const entity = await this.employeeEntityManager.save(Employee, {
      ...input,
      department: { id: input.department.id },
    });

    return {
      success: true,
      id: entity.id,
    };
  }

  @Mutation('updateEmployee')
  async updateEmployee(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('age') age: number,
    @Args('sex') sex: string,
  ) {
    const entity = await this.employeeEntityManager.update(Employee, id, {
      name,
      age,
      sex,
    });

    console.log(entity);

    return {
      success: true,
    };
  }

  @Mutation('deleteEmployee')
  async deleteEmployee(@Args('id') id: string) {
    await this.employeeEntityManager.delete(Employee, id);
    return {
      success: true,
      id: id,
    };
  }
}
