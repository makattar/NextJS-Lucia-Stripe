export interface ResponseResDto<T> {
  success: boolean;
  error: {
    errors: string[];
  };
  message: string;
  statusCode: number;
  data: T | null;
}
