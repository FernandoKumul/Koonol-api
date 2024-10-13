import { Request } from 'express';

export interface IUserRequest extends Request {
  user: {
    rolId: string; 
  };
}
