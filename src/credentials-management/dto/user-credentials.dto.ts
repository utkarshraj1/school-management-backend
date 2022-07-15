import { IsNotEmpty, IsString } from 'class-validator';

export class UserCredentialsDto {
  @IsNotEmpty({ message: 'Username should not be empty.' })
  @IsString({ message: 'Username should be a string' })
  username: string;

  @IsNotEmpty({ message: 'Password should not be empty.' })
  @IsString({ message: 'Password should be a string' })
  password: string;
}
