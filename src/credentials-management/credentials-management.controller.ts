import { Body, Controller, Get, Post } from '@nestjs/common';
import { CredentialsManagementService } from './credentials-management.service';

@Controller()
export class CredentialsManagementController {
  constructor(
    private readonly credentialsManagementService: CredentialsManagementService,
  ) {}

  // APIs will go here
  @Post('signIn')
  signIn(@Body() body: any): string {
    return 'Successfully called signIn method';
  }

  @Post('signUp')
  signUp(@Body() body: any): string {
    return 'Successfully called the signUp method';
  }
}
