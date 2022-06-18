import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ACAD_MAN,
  IAttendance,
  IBatch,
  IClasses,
  ICourses,
  IFaculties,
} from './model/academic-management.model';

@Injectable()
export class AcademicsManagementService {
  constructor(
    @InjectModel(ACAD_MAN.CLASSES)
    private readonly classesModel: Model<IClasses>,
    @InjectModel(ACAD_MAN.COURSES)
    private readonly coursesModel: Model<ICourses>,
    @InjectModel(ACAD_MAN.BATCH) private readonly batchModel: Model<IBatch>,
    @InjectModel(ACAD_MAN.FACULTIES)
    private readonly facultyModel: Model<IFaculties>,
    @InjectModel(ACAD_MAN.ATTENDANCE)
    private readonly attendanceModel: Model<IAttendance>,
  ) {}

  // Implementations will go here
}
