import { DailySpend } from '@/src/feature/insights/domain/entity/DailySpend';

export class DailySpendModel extends DailySpend{
  constructor(
    public amount: number,
    public date: string
  ) {
    super(amount, date);
  }

  static fromJsonList(response: DailySpendModel[]) {
    return response.map(item => item.fromJson(item));
  }

  fromJson(json: any): DailySpendModel {
    return new DailySpendModel(json.amount, json.date);
  }
}