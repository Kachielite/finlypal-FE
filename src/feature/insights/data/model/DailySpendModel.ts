import { DailySpend } from '@/src/feature/insights/domain/entity/DailySpend';

export class DailySpendModel extends DailySpend{
  constructor(
    public amount: number,
    public date: string
  ) {
    super(amount, date);
  }

  static fromJsonList(response: DailySpendModel[]) {
    return response.map(item => DailySpendModel.fromJson(item));
  }

  static fromJson(json: any): DailySpendModel {
    return new DailySpendModel(json.amount, json.date);
  }
}