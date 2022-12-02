import { Email, Name, Password } from './index';

export interface Login {
  email: Email;
  password: Password;
}

export interface SignUp extends Login {
  name: Name;
}
