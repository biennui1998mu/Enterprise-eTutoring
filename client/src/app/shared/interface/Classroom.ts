import { User } from './User';

export interface Classroom<student = User, tutor = User, staff = User> {
  _id?: string,
  description: string;
  student: student;
  tutor: tutor;
  /**
   * 0 = open
   * 1 = close
   */
  status: CLASSROOM_STATUS;
  createdBy: staff;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum CLASSROOM_STATUS {
  open,
  closed
}
