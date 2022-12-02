export interface ErrorException extends Error {
  errno?: number;
  statusCode?: number;
  status?: string;
  path?: string;
  syscall?: string;
  stack?: string;
  isOperational?: boolean;
}

export type Email = string;
export type Password = string;
export type Name = string;
