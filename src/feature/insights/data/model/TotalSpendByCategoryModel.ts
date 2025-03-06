import { TotalSpendByCategory } from '@/src/feature/insights/domain/entity/TotalSpendByCategory';

export class TotalSpendByCategoryModel extends TotalSpendByCategory {
  constructor(
    public totalSpend: number,
    public category: string,
    public percent: number
  ) {
    super(totalSpend, category, percent);
  }

  fromJson(json: any): TotalSpendByCategoryModel {
    return new TotalSpendByCategoryModel(json.totalSpend, json.category, json.percent);
  }

  fromJsonList(response: TotalSpendByCategoryModel[]): TotalSpendByCategoryModel[] {
    return response.map(item => item.fromJson(item));
  }
}