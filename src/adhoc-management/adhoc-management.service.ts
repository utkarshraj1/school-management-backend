import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ADHOC_MAN, IHolidays } from './model/adhoc-management.model';

@Injectable()
export class AdhocManagementService {
  constructor(
    @InjectModel(ADHOC_MAN.HOLIDAYS)
    private readonly holidaysModel: Model<IHolidays>,
  ) {}

  async saveHolidays(holidays: any): Promise<any> {
    return this.holidaysModel.insertMany(holidays);
  }
}
