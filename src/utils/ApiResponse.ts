import { IErrorMessage } from "../interfaces/IErrorMessage";

export class ApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data?: any;
    errors?: IErrorMessage[]
  
    constructor(success: boolean, statusCode: number, message: string, data?: any, errors?: IErrorMessage[]) {
      this.success = success;
      this.statusCode = statusCode;
      this.message = message;
      this.errors = errors;
      this.data = data;
    }
  
    static successResponse(message: string, data?: any) {
      return new ApiResponse(true, 200, message, data);
    }
  
    static errorResponse(message: string, statusCode: number = 400, errors: IErrorMessage[] = []) {
      return new ApiResponse(false, statusCode, message, undefined, errors);
    }
  }
  