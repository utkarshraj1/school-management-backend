import { Body, Controller, Post } from '@nestjs/common';
import { AdhocManagementService } from './adhoc-management.service';

@Controller('adhoc-management')
export class AdhocManagementController {
  constructor(
    private readonly adhocManagementService: AdhocManagementService,
  ) {}

  @Post('/saveHolidays')
  async saveHolidays(@Body() holidays): Promise<any> {
    return this.adhocManagementService.saveHolidays(holidays);
  }
}
