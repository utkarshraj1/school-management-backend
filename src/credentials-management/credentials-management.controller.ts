import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CredentialsManagementService } from './credentials-management.service';

@Controller('/credentials')
export class CredentialsManagementController {
  constructor(
    private readonly credentialsManagementService: CredentialsManagementService,
  ) {}

  /**
   * Sign in with credentials
   * @param userCredentials An object with username and password
   * @returns An appropriate object inside a promise
   */
  @Post('/signIn')
  async signIn(@Body() userCredentials: any): Promise<any> {
    return this.credentialsManagementService.signInUser(userCredentials);
  }

  /**
   * Adding new user
   * @param credentials An object with username, password and user_reg_id
   * @returns A promise with success message
   */
  @Post('/signUp')
  async signUp(@Body() credentials: any): Promise<any> {
    if (
      !credentials.username ||
      !credentials.user_reg_id ||
      !credentials.password
    ) {
      throw new BadRequestException({
        status: 400,
        message: 'All the required fields must be sent.',
        ok: false,
      });
    }
    return this.credentialsManagementService.registerCredentials(credentials);
  }
}
