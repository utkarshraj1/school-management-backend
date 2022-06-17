import { Module } from '@nestjs/common';
import { CredentialsManagementService } from './credentials-management.service';
import { CredentialsManagementController } from './credentials-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  userCredentials,
  USER_CREDENTIALS_NAME,
} from './model/credentials-management.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_CREDENTIALS_NAME,
        schema: userCredentials,
      },
    ]),
  ],
  controllers: [CredentialsManagementController],
  providers: [CredentialsManagementService],
})
export class CredentialsManagementModule {}
