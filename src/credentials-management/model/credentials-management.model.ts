import { Schema, Types } from 'mongoose';

export const USER_CREDENTIALS_NAME = 'userCredentials';

export const userCredentials = new Schema({
  username: { type: String, required: true },
  user_reg_id: { type: String, required: true },
  password: { type: String, required: true },
  active_status: { type: Boolean, required: true },
  addedOn: { type: Date, required: true, default: Date.now },
});

export interface IUserCredentials {
  readonly _id: Types.ObjectId | string;
  username: string;
  user_reg_id: string;
  password: string;
  active_status: boolean;
  addedOn?: Date;
}
