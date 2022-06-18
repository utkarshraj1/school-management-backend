import { Test, TestingModule } from '@nestjs/testing';
import { AcademicsManagementController } from '../academics-management.controller';
import { AcademicsManagementService } from '../academics-management.service';

describe('AcademicsManagementController', () => {
  let controller: AcademicsManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicsManagementController],
      providers: [AcademicsManagementService],
    }).compile();

    controller = module.get<AcademicsManagementController>(
      AcademicsManagementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
