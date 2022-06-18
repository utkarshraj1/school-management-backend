import { Test, TestingModule } from '@nestjs/testing';
import { AcademicsManagementService } from '../academics-management.service';

describe('AcademicsManagementService', () => {
  let service: AcademicsManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademicsManagementService],
    }).compile();

    service = module.get<AcademicsManagementService>(
      AcademicsManagementService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
