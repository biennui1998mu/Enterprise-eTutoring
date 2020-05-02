export interface User {
  _id?: string;
  /**
   * auto increment
   */
  indicator: number;
  username: string;
  password?: string;
  name: string;
  avatar: string;
  /**
   * level of account
   * 0: admin, 1: staff, 2: tutor, 3: student
   */
  level: USER_TYPE;

  createdAt: Date;
  updatedAt?: Date;
  activeAt?: Date;
}

export enum USER_TYPE {
  admin,
  staff,
  tutor,
  student
}
