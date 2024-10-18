export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface FailedResponse {
  success: false;
  status?: number;
  message?: string;
}
