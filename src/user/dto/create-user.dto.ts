import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Registration id must not be empty' })
  reg_id: string;

  @IsNotEmpty({ message: 'Full name should not be empty' })
  full_name: string;

  @IsNotEmpty({ message: 'Date of Birth should not be empty' })
  dob: string;

  @IsNotEmpty({ message: 'Role should not be empty' })
  role: string;

  @IsNotEmpty({ message: 'Gender should not be empty' })
  gender: string;

  @IsNotEmpty({ message: 'DoJ should not be empty' })
  date_of_joining: string;

  @IsNotEmpty({ message: 'Mobile number should not be empty' })
  mobile_num: string;

  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsNotEmpty({ message: 'Address should not be empty' })
  address: string;

  @IsNotEmpty({ message: "Mother's name should not be empty" })
  mother_name: string;

  @IsNotEmpty({ message: "Father's name should not be empty" })
  father_name: string;

  @IsNotEmpty({ message: 'Previous Org name should not be empty' })
  prev_org: string;

  @IsNotEmpty({ message: 'Previous Org Address should not be empty' })
  prev_org_address: string;

  @IsNotEmpty({ message: 'Previous Org role should not be empty' })
  prev_role: string;

  @IsNotEmpty({ message: 'Previous Org role description should not be empty' })
  prev_role_desc: string;

  @IsNotEmpty({ message: 'Previous Org exit date should not be empty' })
  prev_org_exit_date: string;

  @IsNotEmpty({ message: 'Identity Type should not be empty' })
  identity_type: string;

  @IsNotEmpty({ message: 'Identity Number should not be empty' })
  identity_number: string;
}
