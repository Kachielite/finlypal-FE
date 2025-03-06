import { TotalSpend } from '@/src/feature/insights/domain/entity/TotalSpend';

export class TotalSpendModel extends TotalSpend {
  constructor(
    public totalSpend: number
  ) {
    super(totalSpend);
  }

  fromJson(json: any): TotalSpendModel {
    return new TotalSpendModel(json.totalSpend);
  }
}