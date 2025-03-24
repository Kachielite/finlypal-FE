import { Currency } from '@/src/feature/account/domain/entity/currency';

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public currency: Currency
  ) {}
}