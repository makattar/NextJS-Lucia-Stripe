export interface ResponseResDto<T> {
  success: boolean;
  error: {
    errors: string[];
  };
  statusCode: number;
  data: T | null;
}
