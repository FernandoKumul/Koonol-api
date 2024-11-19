import { IResponse, IErrorMessage } from "../interfaces/ILog";

export class ApiResponse implements IResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: any;
  errorMessages?: IErrorMessage[]; 

  constructor(success: boolean, statusCode: number, message: string, data?: any, errorMessages?: IErrorMessage[]) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.errorMessages = errorMessages;
  }

  static successResponse(message: string, data?: any): ApiResponse {
    return new ApiResponse(true, 200, message, data);
  }

  static errorResponse(message: string, statusCode: number = 400, errorMessages: IErrorMessage[] = []): ApiResponse {
    return new ApiResponse(false, statusCode, message, undefined, errorMessages);
  }
}
