import { Budget } from '@/src/feature/budget/domain/entity/budget';

export class BudgetModel extends Budget {
  constructor(
    public id: number,
    public name: string,
    public status: string,
    public statusTooltip: string,
    public startDate: string,
    public endDate: string,
    public totalBudget: number,
    public budgetItems: String[],
    public createdAt: string
  ) {
    super(id, name, status, statusTooltip, startDate, endDate, totalBudget, budgetItems, createdAt);
  }

  static fromJSON(json: any): BudgetModel {
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

  static fromJSONList(jsonList: any[]): BudgetModel[] {
    return jsonList.map(BudgetModel.fromJSON);
  }
}