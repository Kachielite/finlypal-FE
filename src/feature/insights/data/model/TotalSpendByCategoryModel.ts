import { TotalSpendByCategory } from '@/src/feature/insights/domain/entity/TotalSpendByCategory';

export class TotalSpendByCategoryModel extends TotalSpendByCategory {
  constructor(
    public totalSpend: number,
    public category: string,
    public percent: number
  ) {
    super(totalSpend, category, percent);
  }

  static fromJsonList(response: TotalSpendByCategoryModel[]) {
    return response.map(item => item.fromJson(item));
  }

  fromJson(json: any): TotalSpendByCategoryModel {
    return new TotalSpendByCategoryModel(json.totalSpend, json.category, json.percent);
  }
}