import { Currency } from '@/src/feature/account/domain/entity/currency';

export class CurrencyModel extends Currency {
  constructor(
    public id: number,
    public name: string,
    public code: string,
    public symbol: string
  ) {
    super(id, name, code, symbol);
  }

  static fromJson(data: any): CurrencyModel {
    return new CurrencyModel(data.id, data.name, data.code, data.symbol);
  }

  static fromJsonList(data: any): CurrencyModel[] {
    return data?.map(CurrencyModel.fromJson);
  }
}