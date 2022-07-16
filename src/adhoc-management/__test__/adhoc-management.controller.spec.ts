import { Test, TestingModule } from '@nestjs/testing';
import { AdhocManagementController } from '../adhoc-management.controller';
import { AdhocManagementService } from '../adhoc-management.service';

describe('AdhocManagementController', () => {
  let controller: AdhocManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdhocManagementController],
      providers: [AdhocManagementService],
    }).compile();

    controller = module.get<AdhocManagementController>(
      AdhocManagementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
