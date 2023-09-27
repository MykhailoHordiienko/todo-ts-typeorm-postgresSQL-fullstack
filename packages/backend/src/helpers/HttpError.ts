type HttpErrorType = Error & { status: number };

export const HttpError = (status: number, message: string): HttpErrorType => {
  const error = new Error(message) as HttpErrorType;
  error.status = status;
  return error;
};
