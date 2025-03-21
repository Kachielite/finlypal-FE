import { BudgetItem, BudgetItemStatus } from '@/src/feature/budget-item/domain/entity/budget-item';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';
import { ExpenseModel } from '@/src/feature/expenses/data/model/expense-model';

export class BudgetItemModel extends BudgetItem{
  constructor(
    public id: number,
    public name: string,
    public icon: string,
    public status: BudgetItemStatus,
    public statusTooltip: string,
    public expenses: Expense[],
    public allocatedAmount: number,
    public actualSpend: number,
    public budgetId: number,
    public createdAt: string
  ){
    super(id, name, icon, status, statusTooltip, expenses, allocatedAmount, actualSpend, budgetId, createdAt);
  }

  static fromJson(json: any): BudgetItemModel {
    return new BudgetItemModel(
      json.id,
      json.name,
      json.icon,
      json.status,
      json.status_tooltip,
      ExpenseModel.fromJsonList(json.expenses),
      json.allocated_amount,
      json.actual_spend,
      json.budget_id,
      json.created_at,
    );
  }

  static fromJsonList(jsonList: any[]): BudgetItemModel[] {
    return jsonList?.map(BudgetItemModel.fromJson);
  }
}