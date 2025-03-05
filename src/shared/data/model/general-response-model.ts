import { GeneralResponse } from '@/src/shared/domain/entity/general-response';

export class GeneralResponseModel extends GeneralResponse{
    constructor(
      public status: string,
      public message: string,
    ) {
      super(status, message);
    }

    static fromJson(data: any): GeneralResponseModel {
      return new GeneralResponseModel(data.status, data.message);
    }
}