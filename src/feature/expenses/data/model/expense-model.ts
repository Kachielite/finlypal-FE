import { Expense } from '@/src/feature/expenses/domain/entity/expense';

export class ExpenseModel extends Expense{
  constructor(
    public id: number,
    public description: string,
    public amount: number,
    public date: string,
    public type: string,
    public categoryId: number
  ) {
    super(id, description, amount, date, type, categoryId);
  }

  static fromJsonList(response: ExpenseModel[]) {
    return response.map(item => ExpenseModel.fromJson(item));
  }

  static fromJson(response: any): ExpenseModel {
    return new ExpenseModel(response.id, response.description, response.amount, response.date, response.type, response.categoryId)

  }
}