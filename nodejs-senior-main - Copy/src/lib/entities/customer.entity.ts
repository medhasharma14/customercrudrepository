import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'lib/entities/base.entity';
import { Role } from 'src/role/role.enum';


@ObjectType()
export class Customer extends Base {
  roles: Role[];

  @Field(() => String)
  email: string;

  @Field(() => String)
  role: string;
}
