import { Email, Name, Password } from './index';
import { Article } from './article-types';
export interface User {
  id: number;
  email: Email;
  name: Name;
  password?: Password;
  articles?: Article[]
}
