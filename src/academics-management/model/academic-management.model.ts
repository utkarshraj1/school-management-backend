import { Schema, Types } from 'mongoose';

export const ACAD_MAN = {
  CLASSES: 'classes',
  COURSES: 'courses',
  BATCH: 'batch',
  FACULTIES: 'faculties',
};

export const classes = new Schema({
  class_id: { type: String, required: true },
  class_name: { type: String, required: true },
  class_section: { type: String, required: true },
});

export const courses = new Schema({
  course_id: { type: String, required: true },
  course_name: { type: String, required: true },
});

export const batch = new Schema({
  year: { type: Number, required: true },
  class_id: { type: String, required: true },
  student_id: { type: Array, required: true },
  course_id: { type: Array, required: true },
  faculty_id: { type: Array, required: true },
  absents: { type: Array, require: true },
  leader: { type: String, required: true },
});

export const faculties = new Schema({
  user_reg_id: { type: String, required: true },
  courseOwner: { type: Array, required: true },
});

export interface IClasses {
  readonly _id: Types.ObjectId | string;
  class_id: string;
  class_name: string;
  class_section: string;
}

export interface ICourses {
  readonly _id: Types.ObjectId | string;
  course_id: string;
  course_name: string;
}

export interface IBatch {
  readonly _id: Types.ObjectId | string;
  year: number;
  class_id: string;
  student_id: string[];
  course_id: string[];
  faculty_id: string[];
  absents: Array<{ date: string; student_id: string[] }>;
  leader: string;
}

export interface IFaculties {
  readonly _id: Types.ObjectId | string;
  user_reg_id: string;
  courseOwner: string[];
}
