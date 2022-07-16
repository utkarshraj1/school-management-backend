import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUsers } from './model/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Adds a new user into the database
   * @param users An object
   * @returns An object inside a promise
   */
  @Post('/saveUser')
  async saveUserDetails(@Body() user: CreateUserDto): Promise<IUsers> {
    return this.userService.saveUserDetails(user);
  }

  /**
   * Updates a user details
   * @param user An object
   * @returns An object inside a promise
   */
  @Post('/updateUser')
  async updateUserDetails(@Body() user: any): Promise<IUsers> {
    // Will be implemented later
    return this.userService.updateUserDetails(user);
  }

  @Get('/getUserDetails')
  async getUserDetails(@Query('reg_id') reg_id: string): Promise<any> {
    return this.userService.getUserDetails(reg_id);
  }
}
