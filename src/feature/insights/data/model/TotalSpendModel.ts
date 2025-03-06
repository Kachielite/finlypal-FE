import { TotalSpend } from '@/src/feature/insights/domain/entity/TotalSpend';

export class TotalSpendModel extends TotalSpend {
  constructor(
    public totalSpend: number
  ) {
    super(totalSpend);
  }
  
  static fromJson(json: TotalSpendModel) {
    return new TotalSpendModel(json.totalSpend);
  }
}