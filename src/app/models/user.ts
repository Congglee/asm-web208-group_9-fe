export interface ISignup {
  _id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  avatar?: string;
}
export interface ISignin {
  email: string;
  password: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  avatar?: string;
}

export interface IUserResponse {
  userData: IUser;
  success: boolean;
}

export interface IUsersResponse {
  users: IUser[];
  success: boolean;
}
