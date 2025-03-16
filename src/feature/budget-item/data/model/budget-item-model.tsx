import { BudgetItem, BudgetItemStatus } from '@/src/feature/budget-item/domain/entity/budget-item';

export class BudgetItemModel extends BudgetItem{
  constructor(
    public id: number,
    public name: string,
    public icon: string,
    public status: BudgetItemStatus,
    public expenses: [],
    public allocatedAmount: number,
    public actualSpend: number,
    public budgetId: number,
    public createdAt: string
  ){
    super(id, name, icon, status, expenses, allocatedAmount, actualSpend, budgetId, createdAt);
  }

  static fromJson(json: any): BudgetItemModel {
    return new BudgetItemModel(
      json.id,
      json.name,
      json.icon,
      json.status,
      json.expenses,
      json.allocated_amount,
      json.actual_spend,
      json.budget_id,
      json.created_at,
    );
  }

  static fromJsonList(jsonList: any[]): BudgetItemModel[] {
    return jsonList.map(BudgetItemModel.fromJson);
  }
}