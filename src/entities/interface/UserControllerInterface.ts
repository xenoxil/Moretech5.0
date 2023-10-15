export interface AuthEmail {
  email: string;
  password: string;
}
export interface AuthPhone {
  email: string;
  phoneNumber: string;
}
export interface User {
  id: number;
  email: string;
  password: string;
  phoneNumber: string;
  name: string;
  lastname: string;
  login: string;
}
export interface CurrrentUser {
  token: string;
  expiresAt: number;
  issueDate: number;
  user: User;
}
