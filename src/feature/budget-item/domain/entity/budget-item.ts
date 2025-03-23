import { Expense } from '@/src/feature/expenses/domain/entity/expense';

export enum BudgetItemStatus {
  ON_TRACK = '✅ On track',
  OVERSPENT = '🚨 Overspent',
  UNDERSPENT = '📉 Underspent',
  AT_RISK = '⚠️ At risk',
}

export class BudgetItem {
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
  ) {}
}