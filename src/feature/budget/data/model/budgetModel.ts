import { Budget, BudgetStatus } from '@/src/feature/budget/domain/entity/budget';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';

export class BudgetModel extends Budget {
  constructor(
    public id: number,
    public name: string,
    public status: BudgetStatus,
    public statusTooltip: string,
    public startDate: string,
    public endDate: string,
    public totalBudget: number,
    public budgetItems: BudgetItem[],
    public createdAt: string
  ) {
    super(id, name, status, statusTooltip, startDate, endDate, totalBudget, budgetItems, createdAt);
  }

  static fromJson(json: any): BudgetModel {
    return new BudgetModel(
      json.id,
      json.name,
      json.status,
      json.statusTooltip,
      json.start_date,
      json.end_date,
      json.total_budget,
      json.budget_items,
      json.created_at
    );
  }

  static fromJsonList(jsonList: any[]): BudgetModel[] {
    return jsonList.map(BudgetModel.fromJson);
  }
}