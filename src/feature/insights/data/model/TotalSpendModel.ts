import { TotalSpend } from '@/src/feature/insights/domain/entity/TotalSpend';

export class TotalSpendModel extends TotalSpend {
  constructor(
    public totalSpend: number
  ) {
    super(totalSpend);
  }
  
  static fromJson(json: any):TotalSpend {
    return new TotalSpendModel(json.total_spend);
  }
}