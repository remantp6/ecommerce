//define a generic API response type
export type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};
