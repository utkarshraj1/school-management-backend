import { Controller } from '@nestjs/common';
import { CredentialsManagementService } from './credentials-management.service';

@Controller('credentials-management')
export class CredentialsManagementController {
  constructor(
    private readonly credentialsManagementService: CredentialsManagementService,
  ) {}

  // APIs will go here
}
