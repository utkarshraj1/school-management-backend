import { Body, Controller, Post, Query } from '@nestjs/common';
import { AcademicsManagementService } from './academics-management.service';

@Controller('academics')
export class AcademicsManagementController {
  constructor(
    private readonly academicsManagementService: AcademicsManagementService,
  ) {}

  @Post('/addClassDetails')
  async addClassDetails(@Body() classDetails: any): Promise<any> {
    return this.academicsManagementService.addClassDetails(classDetails);
  }

  @Post('/addCourseDetails')
  async addCourseDetails(@Body() courseDetails: any): Promise<any> {
    return this.academicsManagementService.addCourseDetails(courseDetails);
  }

  @Post('/addFaculties')
  async addFacultyDetails(@Body() facultyDetails: any): Promise<any> {
    return this.academicsManagementService.addFacultyDetails(facultyDetails);
  }

  @Post('/createBatch')
  async createBatchDetails(@Body() batchDetails: any): Promise<any> {
    return this.academicsManagementService.createBatchDetails(batchDetails);
  }

  @Post('/attendance')
  async addAttendance(
    @Body() attendance: any,
    @Query('batch') batch: string,
  ): Promise<any> {
    return this.academicsManagementService.addAttendance(attendance, batch);
  }
}
