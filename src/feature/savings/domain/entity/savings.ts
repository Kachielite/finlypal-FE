import { Expense } from '@/src/feature/expenses/domain/entity/expense';

export enum SavingsStatus {
  NOT_STARTED = '⏳ Not started',
  ON_TRACK = '✅ On track',
  AT_RISK = '⚠️ At risk',
  ACHIEVED = '🎉 Achieved',
  FAILED = '❌ Failed',
}


export class Savings {
  constructor(
    public id: number,
    public icon: string,
    public status: SavingsStatus,
    public statusTooltip: string,
    public expenses: Expense[],
    public goalName: string,
    public targetAmount: number,
    public savedAmount: number,
    public startDate: string,
    public endDate: string,
    public createdAt: string
  ) {
  }
}