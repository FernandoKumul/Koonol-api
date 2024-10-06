export class ApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data?: any;
  
    constructor(success: boolean, statusCode: number, message: string, data?: any) {
      this.success = success;
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
    }
  
    static successResponse(message: string, data?: any) {
      return new ApiResponse(true, 200, message, data);
    }
  
    static errorResponse(message: string, statusCode: number = 400) {
      return new ApiResponse(false, statusCode, message);
    }
  }
  