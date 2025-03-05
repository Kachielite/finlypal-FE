export class ErrorResponse {
  constructor(
    public code: string,
    public message: string,
    public timestamp: string,
    public apiPath: string,
  ) {}
}