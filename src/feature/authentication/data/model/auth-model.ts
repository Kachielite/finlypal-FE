import { Auth } from '@/src/feature/authentication/domain/entity/auth';

export class AuthModel extends Auth{
    constructor(
      public access_token: string,
      public refresh_token: string,
    ) {
      super(access_token, refresh_token);
    }

    static fromJson(data: any): AuthModel {
      return new AuthModel(data.access_token, data.refresh_token);
    }
}