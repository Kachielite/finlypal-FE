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

  fromJson(json: any): Expense{
    return new Expense(json.id, json.description, json.amount, json.date, json.type, json.categoryId)
  }

  fromJsonList(response: ExpenseModel[]): Expense[]{
    return response.map(js => js.fromJson(js));
  }
}