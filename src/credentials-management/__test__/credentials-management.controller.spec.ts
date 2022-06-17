import { Test, TestingModule } from '@nestjs/testing';
import { CredentialsManagementController } from '../credentials-management.controller';
import { CredentialsManagementService } from '../credentials-management.service';

describe('CredentialsManagementController', () => {
  let controller: CredentialsManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CredentialsManagementController],
      providers: [CredentialsManagementService],
    }).compile();

    controller = module.get<CredentialsManagementController>(
      CredentialsManagementController,
    );
  });
});
