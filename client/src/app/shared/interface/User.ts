export interface User {
  _id?: string;
  /**
   * auto increment
   */
  indicator?: number;
  username: string;
  password?: string;
  name: string;
  /**
   * gender of user
   * 1: Male, 2: Female, 0: Other
   */
  gender?: USER_GENDER;
  avatar: string;
  /**
   * level of account
   * 0: admin, 1: staff, 2: tutor, 3: student
   */
  level: USER_TYPE;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  activeAt?: Date;

  /**
   * only used in creating new / updating user as
   * we need a field to contain the user uploading avatar file.
   */
  avatarNew?: File;
}

export enum USER_TYPE {
  admin,
  staff,
  tutor,
  student
}

export enum USER_GENDER {
  other,
  male,
  female
}
