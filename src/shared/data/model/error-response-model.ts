import { ErrorResponse } from '@/src/shared/domain/entity/error-response';

export class ErrorResponseModel extends ErrorResponse{
    constructor(
      public status: string,
      public message: string,
      public timestamp: string,
      public apiPath: string,
    ) {
      super(status, message, timestamp, apiPath);
    }

    static fromJson(data: any): ErrorResponseModel {
      return new ErrorResponseModel(data.status, data.message, data.timestamp, data.apiPath);
    }
}