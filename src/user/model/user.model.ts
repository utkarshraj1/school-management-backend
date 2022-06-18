import { Schema, Types } from 'mongoose';

export const SCHEMA_NAMES = {
  USERS: 'users',
  IDENTITY_DETAILS: 'identification_details',
  BACK_DETAILS: 'background_details',
};

export const users = new Schema({
  reg_id: { type: String, required: true },
  full_name: { type: String, required: true },
  dob: { type: String, required: true },
  role: { type: String, required: true },
  gender: { type: String, required: true },
  date_of_joining: { type: String, required: true },
  mobile_num: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  mother_name: { type: String, required: true },
  father_name: { type: String, required: true },
  identification_id: { type: String, required: true },
  background_details_id: { type: String, required: true },
  active_status: { type: Boolean, required: true },
  addedOn: { type: Date, required: true, default: Date.now },
});

export const identification_details = new Schema({
  identity_type: { type: String, required: true },
  identity_number: { type: String, required: true },
  addedOn: { type: Date, required: true, default: Date.now },
});

export const background_details = new Schema({
  prev_org: { type: String, required: true },
  prev_org_address: { type: String, required: true },
  prev_role: { type: String, required: true },
  prev_role_desc: { type: String, required: true },
  prev_org_exit_date: { type: String, required: true },
  addedOn: { type: Date, required: true, default: Date.now },
});

export interface IUsers {
  readonly _id: Types.ObjectId | string;
  reg_id: string;
  full_name: string;
  dob: string;
  role: string;
  gender: string;
  date_of_joining: string;
  mobile_num: string;
  email: string;
  address: string;
  mother_name: string;
  father_name: string;
  identification_id: string;
  background_details_id: string;
  active_status: boolean;
  addedOn?: Date;
}

export interface IIdentificationDetails {
  readonly _id: Types.ObjectId | string;
  identity_type: string;
  identity_number: string;
  addedOn?: Date;
}

export interface IBackgroundDetails {
  readonly _id: Types.ObjectId | string;
  prev_org: string;
  prev_org_address: string;
  prev_role: string;
  prev_role_desc: string;
  prev_org_exit_date: string;
  addedOn: Date;
}
