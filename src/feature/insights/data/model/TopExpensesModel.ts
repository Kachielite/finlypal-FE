import { TopExpenses } from '@/src/feature/insights/domain/entity/TopExpenses';

export class TopExpensesModel extends TopExpenses{
  constructor(
    public description: string,
    public amount: number,
    public date: string
  ) {
    super(description, amount, date);
  }

  static fromJsonList(response: TopExpensesModel[]) {
    return response.map(item => item.fromJson(item));
  }

  fromJson(json: any): TopExpensesModel {
    return new TopExpensesModel(json.description, json.amount, json.date);
  }
}