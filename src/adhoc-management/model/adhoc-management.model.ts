import { Schema, Types } from 'mongoose';

export const ADHOC_MAN = {
  HOLIDAYS: 'holidays',
};

export const holidays = new Schema({
  day_name: { type: String, required: true },
});

export interface IHolidays {
  readonly _id: Types.ObjectId | string;
  day_name: string;
}
