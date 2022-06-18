import { Schema } from 'mongoose';

export const ACAD_MAN = {
  CLASSES: 'classes',
  COURSES: 'courses',
  BATCH: 'batch',
  FACULTIES: 'faculties',
  ATTENDANCE: 'attendance',
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
  students: { type: Array, required: true },
  courses: { type: Array, required: true },
  faculties: { type: Array, required: true },
  attendance: { type: Array, required: true },
  leader: { type: String, required: true },
});

export const faculties = new Schema({
  user_reg_id: { type: String, required: true },
  courseOwner: { type: Array, required: true },
});

export const attendance = new Schema({
  year: { type: String, required: true },
  class_id: { type: String, required: true },
  date: { type: String, required: true },
  students: { type: String, required: true },
  addedBy: { type: String, required: true },
});

export interface IClasses {
  class_id: string;
  class_name: string;
  class_section: string;
}

export interface ICourses {
  course_id: string;
  course_name: string;
}

export interface IBatch {
  year: number;
  class_id: string;
  students: string[];
  courses: string[];
  faculties: string[];
  attendance: string[];
  leader: string;
}

export interface IFaculties {
  user_reg_id: string;
  courseOwner: string[];
}

export interface IAttendance {
  year: string;
  class_id: string;
  date: string;
  students: string;
  addedBy: string;
}
