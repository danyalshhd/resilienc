export interface ApiResponse<T> {
  status: 'success' | 'error';
  code: number;
  data?: T;
  error?: {
    message: string;
    details?: string[];
  };
  timestamp: string;
}

export class ApiResponseBuilder {
  static success<T>(data: T, statusCode = 200): ApiResponse<T> {
    return {
      status: 'success',
      code: statusCode,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  static error(message: string, statusCode = 400, details?: string[]): ApiResponse<null> {
    return {
      status: 'error',
      code: statusCode,
      error: {
        message,
        ...(details && { details }),
      },
      timestamp: new Date().toISOString(),
    };
  }
}
