import { Body, Controller, Post } from '@nestjs/common';
import { CredentialsManagementService } from './credentials-management.service';

@Controller()
export class CredentialsManagementController {
  constructor(
    private readonly credentialsManagementService: CredentialsManagementService,
  ) {}

  // APIs will go here
  // @Post('signIn')
  // signIn(@Body() body: any): string {
  //   return 'Successfully called signIn method';
  // }

  /**
   * Adding new user
   * @param credentials An object with username, password and user_reg_id
   * @returns A promise with success message
   */
  @Post('signUp')
  async signUp(@Body() credentials: any): Promise<any> {
    if (
      !credentials.username ||
      !credentials.user_reg_id ||
      !credentials.password
    ) {
      // User proper error handling
      return { status: 404, message: 'All required fields must be entered!' };
    }
    const response =
      await this.credentialsManagementService.registerCredentials(credentials);
    return response;
  }
}
