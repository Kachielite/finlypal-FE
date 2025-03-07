import { TotalSpend } from '@/src/feature/insights/domain/entity/TotalSpend';

export class MonthlySpend extends TotalSpend{
  constructor(
    public totalSpend: number,
    public month: string,
    public type: string
  ) {
    super(totalSpend);
  }
}