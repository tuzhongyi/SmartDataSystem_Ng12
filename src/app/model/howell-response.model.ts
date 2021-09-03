interface HowellResponse<T> {
  FaultCode: number;
  FaultReason: string;
  InnerException: ExceptionData;
  Data: T;
}

interface ExceptionData {
  Message: string;
  ExceptionType: string;
  InnerException: ExceptionData;
}

interface HttpResponse<T> {
  data: HowellResponse<T>;
  status: number;
  statusText: string;
}

interface Fault {
  FaultCode: number;
  FaultReason: string;
  Exception: ExceptionData;
  Id: string;
}

export { HowellResponse, ExceptionData, HttpResponse, Fault };
