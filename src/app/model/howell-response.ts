export interface HowellResponse<T> {
  FaultCode: number;
  FaultReason: string;
  InnerException: ExceptionData;
  Data: T;
}

export interface ExceptionData {
  Message: string;
  ExceptionType: string;
  InnerException: ExceptionData;
}

export interface HttpResponse<T> {
  data: HowellResponse<T>;
  status: number;
  statusText: string;
}

export interface Fault {
  FaultCode: number;
  FaultReason: string;
  Exception: ExceptionData;
  Id: string;
}
