export class Budget {
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
  ) {}
}