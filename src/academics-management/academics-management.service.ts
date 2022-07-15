import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { dbOperationUnexpectedErrorObj } from 'src/shared/constants/error-constants';
import {
  ACAD_MAN,
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
  ) {}

  async addClassDetails(classDetails: any): Promise<any> {
    const classDetailsInCollec = await this.classesModel.findOne({
      class_id: classDetails.class_id,
    });

    if (classDetailsInCollec) {
      throw new HttpException(
        {
          statusCode: 200,
          ok: false,
          message: 'Class is already present.',
        },
        200,
      );
    }

    const classObj = await this.classesModel.create({
      ...classDetails,
    });

    if (!classObj._id) {
      throw new InternalServerErrorException(dbOperationUnexpectedErrorObj);
    }

    return classObj;
  }

  async addCourseDetails(courseDetails: any): Promise<any> {
    const courseDetailsInCollec = await this.coursesModel.findOne({
      course_id: courseDetails.course_id,
    });

    if (courseDetailsInCollec) {
      throw new HttpException(
        {
          statusCode: 200,
          ok: false,
          message: 'Course is already present.',
        },
        200,
      );
    }

    const courseObj = await this.coursesModel.create({
      ...courseDetails,
    });

    if (!courseObj._id) {
      throw new InternalServerErrorException(dbOperationUnexpectedErrorObj);
    }

    return courseObj;
  }

  async addFacultyDetails(facultyDetails: any): Promise<any> {
    const facDetailsInCollec = await this.facultyModel.findOne({
      user_reg_id: facultyDetails.user_reg_id,
    });

    if (facDetailsInCollec) {
      throw new HttpException(
        {
          statusCode: 200,
          ok: false,
          message: 'Faculty is already present.',
        },
        200,
      );
    }

    const facultyObj = await this.facultyModel.create({
      ...facultyDetails,
    });

    if (!facultyObj._id) {
      throw new InternalServerErrorException(dbOperationUnexpectedErrorObj);
    }

    return facultyObj;
  }

  async createBatchDetails(batchDetails: any): Promise<any> {
    const batchDetailsInCollec = await this.batchModel.findOne({
      course_id: batchDetails.course_id,
    });

    if (batchDetailsInCollec) {
      throw new HttpException(
        {
          statusCode: 200,
          ok: false,
          message: 'Batch is already present.',
        },
        200,
      );
    }

    const batchObj = await this.batchModel.create({
      ...batchDetails,
    });

    if (!batchObj._id) {
      throw new InternalServerErrorException(dbOperationUnexpectedErrorObj);
    }

    return batchObj;
  }
}
