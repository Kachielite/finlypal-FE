import Any = jasmine.Any;

export class BudgetService {
  constructor(
    public id: number,
    public name: string,
    public status: string,
    public statusTooltip: string,
    public startDate: string,
    public endDate: string,
    public totalBudget: number,
    public budgetItems: Any[],
    public createdAt: string
  ) {}
}