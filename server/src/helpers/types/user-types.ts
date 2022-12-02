import { Email, Name, Password } from './index';

export interface User {
  id: number;
  email: Email;
  name: Name;
  password?: Password;
}
