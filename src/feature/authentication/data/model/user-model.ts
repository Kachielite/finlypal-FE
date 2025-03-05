import { User } from '@/src/feature/authentication/domain/entity/user';

export class UserModel extends User{
    constructor(
      public id: string,
      public name: string,
      public email: string,
    ) {
      super(id, name, email);
    }

    static fromJson(data: any): UserModel {
      return new UserModel( data.id, data.name, data.email,);
    }
}