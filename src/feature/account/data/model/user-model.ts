import { User } from '@/src/feature/account/domain/entity/user';
import { Currency } from '@/src/feature/account/domain/entity/currency';
import { CurrencyModel } from '@/src/feature/account/data/model/currency-model';

export class UserModel extends User{
    constructor(
      public id: string,
      public name: string,
      public email: string,
      public currency: Currency
    ) {
      super(id, name, email, currency);
    }

    static fromJson(data: any): UserModel {
      return new UserModel( data.id, data.name, data.email, CurrencyModel.fromJson(data.currency));
    }
}