import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { ApiResponse } from '../utils/ApiResponse';
import { IErrorMessage } from '../interfaces/IErrorMessage';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages: IErrorMessage[] = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(400).json(ApiResponse.errorResponse('Validation Error', 400, errorMessages));
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  };
}