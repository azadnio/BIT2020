import { IUser } from '@SharedRepo/interfaces/user.interface';
import { UserRole } from '@SharedRepo/enums/user-roles.enum';
import { IsEmail, IsString, IsNotEmpty, IsEnum, IsOptional, Matches } from 'class-validator';
import { ValidateStringField } from 'src/common/decorators/validate-string-field.decorator';

// Data Transfer Object for creating a user
export class CreateUserDto implements Partial<IUser> {
  // User email (required, must be valid)
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  // User password (required, min length 6)
  @ValidateStringField({ minLength: 6, required: true })
  password: string;

  // User role (optional, must be one of the specified roles)
  @IsOptional({
    message: 'Role is optional, but if provided, must be one of the specified roles.',
  })
  @IsEnum(UserRole, {
    message: 'Role must be one of the following: admin, manager, customer, staff.',
  })
  role?: UserRole;

  // User name (required)
  @ValidateStringField()
  name: string;

  // Landline telephone (optional, must match Sri Lankan format)
  @IsOptional()
  @Matches(/^0[1-689]\d{8}$/, { message: 'Invalid Sri Lankan landline number' })
  telephone?: string;

  // Address (required)
  @ValidateStringField()
  address: string;

  // Additional address (optional)
  @ValidateStringField({ required: false })
  address2?: string;

  // City (optional)
  @ValidateStringField()
  city?: string;

  // National ID (optional, must match Sri Lankan NIC format)
  @IsOptional()
  @Matches(/^([1-9]\d{8}[vVxX]|[12]\d{11})$/, { message: 'Invalid Sri Lankan NIC format' })
  nic?: string;

  // Mobile number (required, must match Sri Lankan mobile format)
  @IsNotEmpty({ message: 'Mobile number is required.' })
  @Matches(/^07[01245678]\d{7}$/, {
    message: 'Mobile number must start with 07 and be followed by 9 digits.',
  })
  mobile: string;

  // Photo path (optional)
  @IsOptional()
  @IsString({ message: 'Photo path must be a string.' })
  photo?: string;

  constructor(partial: Partial<IUser>) {
    Object.assign(this, partial);
  }
}
