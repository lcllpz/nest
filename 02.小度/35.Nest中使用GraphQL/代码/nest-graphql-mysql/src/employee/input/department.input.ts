import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DepartmentInput {
  @Field(() => Int)
  id: number; // 只传递必要字段（如ID）
}
