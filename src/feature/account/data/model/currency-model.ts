import { Currency } from '@/src/feature/account/domain/entity/currency';

export class CurrencyModel extends Currency {
  constructor(
    public name: string,
    public code: string,
    public symbol: string
  ) {
    super(name, code, symbol);
  }

  static fromJson(data: any): CurrencyModel {
    return new CurrencyModel(data.name, data.code, data.symbol);
  }
}