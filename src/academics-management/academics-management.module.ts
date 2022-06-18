import { Module } from '@nestjs/common';
import { AcademicsManagementService } from './academics-management.service';
import { AcademicsManagementController } from './academics-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ACAD_MAN,
  attendance,
  batch,
  classes,
  courses,
  faculties,
} from './model/academic-management.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ACAD_MAN.CLASSES,
        schema: classes,
      },
      {
        name: ACAD_MAN.COURSES,
        schema: courses,
      },
      {
        name: ACAD_MAN.BATCH,
        schema: batch,
      },
      {
        name: ACAD_MAN.FACULTIES,
        schema: faculties,
      },
      {
        name: ACAD_MAN.ATTENDANCE,
        schema: attendance,
      },
    ]),
  ],
  controllers: [AcademicsManagementController],
  providers: [AcademicsManagementService],
})
export class AcademicsManagementModule {}
