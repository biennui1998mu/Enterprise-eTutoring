export interface Schedule<user = any, classroom = any> {
  _id?: string;
  title: string;
  description: string;
  createdBy: user;
  classroom: classroom;
  listDate: Date[];
  createdAt?: Date;
  updatedAt?: Date;
}
