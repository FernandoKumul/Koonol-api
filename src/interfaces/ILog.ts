export interface IRequest {
    method: string;
    endpoint: string;
    body: Record<string, any>;
  }
  
  export interface IErrorMessage {
    message: string;
  }
  
  export interface IResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data?: any;
    errorMessages?: IErrorMessage[]; 
  }
  
  export interface ILog {
    timestamp: Date;
    userId?: string;
    ipAddress: string;
    request: IRequest;
    response: IResponse;
  }
  