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
    return response.map(item => TopExpensesModel.fromJson(item));
  }

  static fromJson(json: any): TopExpensesModel {
    return new TopExpensesModel(json.description, json.amount, json.date);
  }
}