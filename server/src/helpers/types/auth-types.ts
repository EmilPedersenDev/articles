import { Email, Name, Password } from './index';
import { Request } from 'express';

export interface Login {
  email: Email;
  password: Password;
}

export interface SignUp extends Login {
  name: Name;
}
export interface CustomRequest extends Request {
  user: any;
}
