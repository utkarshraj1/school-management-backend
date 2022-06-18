import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  background_details,
  identification_details,
  SCHEMA_NAMES,
  users,
} from './model/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SCHEMA_NAMES.USERS,
        schema: users,
      },
      {
        name: SCHEMA_NAMES.IDENTITY_DETAILS,
        schema: identification_details,
      },
      {
        name: SCHEMA_NAMES.BACK_DETAILS,
        schema: background_details,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
