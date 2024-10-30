import { Request } from 'express';

export interface IUserRequest extends Request {
    user: {
        userId: string;
        userName: string;
        rolName: string;
        rolId: string;
    };
}
