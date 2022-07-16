import { Module } from '@nestjs/common';
import { AdhocManagementService } from './adhoc-management.service';
import { AdhocManagementController } from './adhoc-management.controller';
import { ADHOC_MAN, holidays } from './model/adhoc-management.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ADHOC_MAN.HOLIDAYS, schema: holidays }]),
  ],
  controllers: [AdhocManagementController],
  providers: [AdhocManagementService],
})
export class AdhocManagementModule {}
