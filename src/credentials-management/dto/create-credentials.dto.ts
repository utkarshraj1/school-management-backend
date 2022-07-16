import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCredentialsDto {
  @IsNotEmpty({ message: 'Username should not be empty' })
  @IsString({ message: 'username should be string' })
  username: string;

  @IsNotEmpty({ message: 'password should not be empty' })
  @IsString({ message: 'password should be string' })
  password: string;

  @IsNotEmpty({ message: 'user_reg_id should not be empty' })
  @IsString({ message: 'user_reg_id should be string' })
  user_reg_id: string;
}
