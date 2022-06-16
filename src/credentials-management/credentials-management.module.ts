import { Module } from '@nestjs/common';
import { CredentialsManagementService } from './credentials-management.service';
import { CredentialsManagementController } from './credentials-management.controller';

@Module({
  controllers: [CredentialsManagementController],
  providers: [CredentialsManagementService],
})
export class CredentialsManagementModule {}
