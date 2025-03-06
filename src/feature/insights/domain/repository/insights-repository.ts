import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { TotalSpend } from '@/src/feature/insights/domain/entity/TotalSpend';
import { MonthlySpend } from '@/src/feature/insights/domain/entity/MonthlySpend';
import { TotalSpendByCategory } from '@/src/feature/insights/domain/entity/TotalSpendByCategory';
import { TopExpenses } from '@/src/feature/insights/domain/entity/TopExpenses';

export interface InsightsRepository {
  getTotalSpend(type: string, startDate?: string, endDate?: string): Promise<Either<Failure, TotalSpend>>;
  getMonthlySpend(type: string, startDate?: string, endDate?: string): Promise<Either<Failure, MonthlySpend[]>>;
  getTotalSpendByCategory(type: string, startDate?: string, endDate?: string): Promise<Either<Failure, TotalSpendByCategory[]>>;
  getTopExpenses(type: string, startDate?: string, endDate?: string): Promise<Either<Failure, TopExpenses[]>>;
  getTotalSpend(type: string, startDate?: string, endDate?: string): Promise<Either<Failure, TotalSpend>>;
}