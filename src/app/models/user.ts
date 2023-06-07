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
