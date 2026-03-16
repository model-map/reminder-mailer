export interface IUser {
  username: string;
  email: string;
  password: string;
  verified?: boolean; // TO-DO : IF USER HAS VERIFIED THEIR EMAIL
  createdAt?: Date;
  updatedAt?: Date;
}
