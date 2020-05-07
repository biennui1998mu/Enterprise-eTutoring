import { Classroom } from './Classroom';
import { User } from './User';

export interface ClassroomFile<classroomType = Classroom, userType = User> {
  _id?: string;
  name: string;
  url: string;
  classroom: classroomType;
  byUser?: userType;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}
