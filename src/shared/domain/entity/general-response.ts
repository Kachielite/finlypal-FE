export class GeneralResponse {
  constructor(
    public status: string,
    public message: string,
  ) {}


  static fromJson(response: any) {
    return new GeneralResponse(response.status, response.message)
  }
}