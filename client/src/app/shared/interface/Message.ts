import { Classroom } from './Classroom';
import { User } from './User';

export interface Message<classroomType = Classroom<string, string, string>,
  senderType = User,
  quoteType = string> {
  _id?: string;
  classroom: classroomType;
  content: string;
  byUser: senderType;
  createdAt?: Date;
  quote?: quoteType;
}
