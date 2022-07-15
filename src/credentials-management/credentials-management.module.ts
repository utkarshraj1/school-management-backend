import { Module } from '@nestjs/common';
import { CredentialsManagementService } from './credentials-management.service';
import { CredentialsManagementController } from './credentials-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  userCredentials,
  USER_CREDENTIALS_NAME,
} from './model/credentials-management.model';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_CREDENTIALS_NAME,
        schema: userCredentials,
      },
    ]),
    UserModule,
  ],
  controllers: [CredentialsManagementController],
  providers: [CredentialsManagementService],
})
export class CredentialsManagementModule {}
