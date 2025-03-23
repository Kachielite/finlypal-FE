import { Expense } from '@/src/feature/expenses/domain/entity/expense';

export class ExpenseModel extends Expense{
  constructor(
    public id: number,
    public description: string,
    public amount: number,
    public date: string,
    public type: string,
    public categoryId: number,
    public categoryName: string,
    public budgetItemId?: number,
    public savingsID?: number
  ) {
    super(id, description, amount, date, type, categoryId, categoryName, budgetItemId, savingsID);
  }

  static fromJsonList(response: ExpenseModel[]) {
    return response?.map(item => ExpenseModel.fromJson(item));
  }

  static fromJson(response: any): ExpenseModel {
    return new ExpenseModel(
      response.id,
      response.description,
      response.amount,
      response.date,
      response.type,
      response.category_id,
      response.category_name,
      response.budget_item_id,
      response.savings_item_id
    )

  }
}