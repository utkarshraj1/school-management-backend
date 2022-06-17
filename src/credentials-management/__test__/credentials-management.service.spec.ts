import { Test, TestingModule } from '@nestjs/testing';
import { CredentialsManagementService } from '../credentials-management.service';

describe('CredentialsManagementService', () => {
  let service: CredentialsManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CredentialsManagementService],
    }).compile();

    service = module.get<CredentialsManagementService>(
      CredentialsManagementService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
