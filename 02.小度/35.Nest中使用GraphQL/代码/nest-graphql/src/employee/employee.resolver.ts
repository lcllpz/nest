import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

let employees = [
  {
    id: '1',
    name: async () => {
      await '取数据';
      return 'jack';
    },
    sex: '男',
    age: 18,
  },
  {
    id: '2',
    name: 'rose',
    sex: '女',
    age: 20,
  },
  {
    id: '3',
    name: 'tom',
    sex: '男',
    age: 31,
  },
];

const departments = [
  {
    id: '1',
    name: '技术部',
    employees: employees,
  },
];

@Resolver()
export class EmployeeResolver {
  @Query('employees')
  async getEmployees() {
    return employees;
  }

  @Query('departments')
  async getDepartments() {
    return departments;
  }

  @Mutation('addEmployee')
  async addEmployee(
    @Args('name') name: string,
    @Args('age') age: number,
    @Args('sex') sex: string,
  ) {
    employees.push({
      id: Math.ceil(Math.random() * 100) + '',
      name,
      age,
      sex,
    });

    return {
      success: true,
      id: Math.ceil(Math.random() * 100) + '',
    };
  }

  @Mutation('updateEmployee')
  async updateEmployee(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('age') age: number,
    @Args('sex') sex: string,
  ) {
    employees.forEach((item) => {
      if (item.id === id) {
        item.name = name;
        item.age = age;
        item.sex = sex;
      }
    });
    return {
      success: true,
      id,
    };
  }

  @Mutation('deleteEmployee')
  async deleteEmployee(@Args('id') id: string) {
    employees = employees.filter((item) => item.id !== id);
    return {
      success: true,
      id,
    };
  }
}
