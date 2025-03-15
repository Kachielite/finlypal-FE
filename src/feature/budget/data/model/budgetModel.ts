import { Budget, BudgetStatus } from '@/src/feature/budget/domain/entity/budget';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';

export class BudgetModel extends Budget {
  constructor(
    public id: number,
    public name: string,
    public icon: string,
    public status: BudgetStatus,
    public statusTooltip: string,
    public startDate: string,
    public endDate: string,
    public totalBudget: number,
    public createdAt: string,
    public actualSpend?: number,
    public budgetItems?: BudgetItem[],
  ) {
    super(id, name, icon, status, statusTooltip, startDate, endDate, totalBudget, createdAt, actualSpend, budgetItems);
  }

  static fromJson(json: any): BudgetModel {
    return new BudgetModel(
      json.id,
      json.name,
      json.icon,
      json.status,
      json.status_tooltip,
      json.start_date,
      json.end_date,
      json.created_at,
      json.total_budget,
      json.actual_spend,
      json.budget_items,
    );
  }

  static fromJsonList(jsonList: any[]): BudgetModel[] {
    return jsonList.map(BudgetModel.fromJson);
  }
}