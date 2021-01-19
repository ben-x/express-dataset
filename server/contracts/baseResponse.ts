import { HttpStatusCode } from '../constants/constants';

// this is the service res
export interface BaseResponse<T> {
  data: T;
  statusCode: HttpStatusCode;
  errorMessage: string;
}

export function makeResponse<T>(
  data: T,
  statusCode: HttpStatusCode = HttpStatusCode.OK,
  errorMessage: string = '',
): BaseResponse<T> {
  return { data, statusCode, errorMessage };
}
