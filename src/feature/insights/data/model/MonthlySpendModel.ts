import { MonthlySpend } from '@/src/feature/insights/domain/entity/MonthlySpend';

export class MonthlySpendModel extends MonthlySpend{
  constructor(
    public totalSpend: number,
    public month: string,
    public type: string
  ) {
    super(totalSpend, month, type);
  }

  static fromJsonList(response: MonthlySpendModel[]) {
    return response.map(item => item.fromJson(item));
  }

  fromJson(json: any): MonthlySpendModel {
    return new MonthlySpendModel(json.totalSpend, json.month, json.type);
  }
}