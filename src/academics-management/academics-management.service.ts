import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  dbOperationUnexpectedErrorObj,
  dbEntryAlreadyPresentErrorObj,
} from 'src/shared/constants/error-constants';
import {
  ACAD_MAN,
  IAbsenteeList,
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
    @InjectModel(ACAD_MAN.ABSENTEELIST)
    private readonly absenteelistModel: Model<IAbsenteeList>,
  ) {}

  /**
   * Throws exception based on encountered situation
   * @param errType A string describing the error
   */
  throwNewException(errType: string): void {
    switch (errType.toLowerCase()) {
      case 'duplicate':
        throw new HttpException(
          dbEntryAlreadyPresentErrorObj,
          dbEntryAlreadyPresentErrorObj.statusCode,
        );

      case 'server-error':
        throw new InternalServerErrorException(dbOperationUnexpectedErrorObj);
    }
  }

  async addClassDetails(classDetails: any): Promise<any> {
    const classDetailsInCollec = await this.classesModel.findOne({
      class_id: classDetails.class_id,
    });

    if (classDetailsInCollec) {
      this.throwNewException('duplicate');
    }

    const classObj = await this.classesModel.create({
      ...classDetails,
    });

    if (!classObj._id) {
      this.throwNewException('server-error');
    }

    return classObj;
  }

  async addCourseDetails(courseDetails: any): Promise<any> {
    const courseDetailsInCollec = await this.coursesModel.findOne({
      course_id: courseDetails.course_id,
    });

    if (courseDetailsInCollec) {
      this.throwNewException('duplicate');
    }

    const courseObj = await this.coursesModel.create({
      ...courseDetails,
    });

    if (!courseObj._id) {
      this.throwNewException('server-error');
    }

    return courseObj;
  }

  async addFacultyDetails(facultyDetails: any): Promise<any> {
    const facDetailsInCollec = await this.facultyModel.findOne({
      user_reg_id: facultyDetails.user_reg_id,
    });

    if (facDetailsInCollec) {
      this.throwNewException('duplicate');
    }

    const facultyObj = await this.facultyModel.create({
      ...facultyDetails,
    });

    if (!facultyObj._id) {
      this.throwNewException('server-error');
    }

    return facultyObj;
  }

  async createBatchDetails(batchDetails: any): Promise<any> {
    const batchDetailsInCollec = await this.batchModel.findOne({
      course_id: batchDetails.course_id,
    });

    if (batchDetailsInCollec) {
      this.throwNewException('duplicate');
    }

    const batchObj = await this.batchModel.create({
      ...batchDetails,
    });

    if (!batchObj._id) {
      this.throwNewException('server-error');
    }

    return batchObj;
  }

  async addAttendance(attendance: any, batch: string): Promise<any> {
    const { _id: absenteeId } = await this.absenteelistModel.create({
      ...attendance,
    });

    const batchObj = await this.batchModel.updateOne(
      { batch_id: batch },
      {
        $push: {
          absents: absenteeId,
        },
      },
    );

    return batchObj;
  }
}
