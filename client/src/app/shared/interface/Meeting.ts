import { User } from './User';
import { Classroom } from './Classroom';

export interface Meeting<user = User, classroom = Classroom> {
  _id?: string;
  title: string;
  description: string;
  createdBy?: user;
  classroom: classroom;
  address: string;
  time: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
