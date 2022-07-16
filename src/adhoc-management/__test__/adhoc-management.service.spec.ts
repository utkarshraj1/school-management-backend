import { Test, TestingModule } from '@nestjs/testing';
import { AdhocManagementService } from '../adhoc-management.service';

describe('AdhocManagementService', () => {
  let service: AdhocManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdhocManagementService],
    }).compile();

    service = module.get<AdhocManagementService>(AdhocManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
