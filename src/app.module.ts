import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { CredentialsManagementModule } from './credentials-management/credentials-management.module';
import { UserModule } from './user/user.module';
import { AcademicsManagementModule } from './academics-management/academics-management.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          uri: configService.get('DB_HOST'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as MongooseModuleAsyncOptions),
    }),
    CredentialsManagementModule,
    UserModule,
    AcademicsManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
