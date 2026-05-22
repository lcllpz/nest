import { InputType, Field, Int } from '@nestjs/graphql';
import { DepartmentInput } from './department.input';

@InputType()
export class CreateEmployeeInput {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  sex: string;

  @Field(() => DepartmentInput) // 使用输入类型
  department: DepartmentInput;
}
