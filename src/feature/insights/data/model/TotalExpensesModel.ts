import { TotalExpenses } from '@/src/feature/insights/domain/entity/TotalExpenses';

export class TotalExpensesModel extends TotalExpenses{
  constructor(
    public description: string,
    public amount: number,
    public date: string
  ) {
    super(description, amount, date);
  }

  fromJson(json: any): TotalExpensesModel {
    return new TotalExpensesModel(json.description, json.amount, json.date);
  }
}