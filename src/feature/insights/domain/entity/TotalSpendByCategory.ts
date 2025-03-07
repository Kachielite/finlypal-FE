import { TotalSpend } from '@/src/feature/insights/domain/entity/TotalSpend';

export class TotalSpendByCategory extends TotalSpend{
  constructor(
    public totalSpend: number,
    public category: string,
    public percent: number
  ) {
    super(totalSpend);
  }
}