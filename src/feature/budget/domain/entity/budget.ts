import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';

export enum BudgetStatus {
  PLANNED = '📅 Planned',
  IN_PROGRESS = '⏳ In progress',
  COMPLETED = '🎉 Completed',
  EXCEEDED = '🚨 Exceeded',
  EXPIRED = '✅ Expired',
  AT_RISK = '⚠️ At risk',
  UNDERUTILIZED = '📉 Underutilized',
}

export class Budget {
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
  ) {}
}