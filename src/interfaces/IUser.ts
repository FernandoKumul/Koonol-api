export interface IUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  rolId: string;
  photo?: string;
  birthday?: Date;
  gender?: string;
  phoneNumber?: string;
  creationDate?: Date;
  updateDate?: Date;
}
