import { ICustomer } from '@SharedRepo/interfaces/customer.interface';
import { ValidateIntegerField } from 'src/common/decorators/validate-inter-field.decorator';
// import { CreateUserDto } from "src/users/dto/create-user.dto";
import { CreateUserDto } from 'src/feature/users/dto/create-user.dto';

export class CreateCustomerDto extends CreateUserDto implements Partial<ICustomer> {
  @ValidateIntegerField({
    min: 50_000,
    max: 50_000_000,
    required: false,
  })
  creditLimit?: number;
}
