import { Controller } from '@nestjs/common';
import { AcademicsManagementService } from './academics-management.service';

@Controller('academics')
export class AcademicsManagementController {
  constructor(
    private readonly academicsManagementService: AcademicsManagementService,
  ) {}

  // Implementations will go here
}
