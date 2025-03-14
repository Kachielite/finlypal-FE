import { Expense } from '@/src/feature/expenses/domain/entity/expense';

export enum BudgetItemStatus {
  ON_TRACK = 'ON_TRACK',
  OVERSPENT = 'OVERSPENT',
  UNDERSPENT = 'UNDERSPENT'
}

export class BudgetItem {
  constructor(
    public id: number,
    public name: string,
    public status: BudgetItemStatus,
    public expenses: Expense[],
    public allocatedAmount: number,
    public actualSpend: number,
    public budgetId: number,
    public createdAt: string
  ) {}
}