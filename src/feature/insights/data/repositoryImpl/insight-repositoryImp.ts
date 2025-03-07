import { InsightsRepository } from '@/src/feature/insights/domain/repository/insights-repository';
import { Either, left, right } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { MonthlySpend } from '@/src/feature/insights/domain/entity/MonthlySpend';
import { TopExpenses } from '@/src/feature/insights/domain/entity/TopExpenses';
import { TotalSpend } from '@/src/feature/insights/domain/entity/TotalSpend';
import { TotalSpendByCategory } from '@/src/feature/insights/domain/entity/TotalSpendByCategory';
import Error from 'es-errors';
import { InsightsDatasource } from '@/src/feature/insights/data/datasource/insights-datasource';
import { DailySpend } from '@/src/feature/insights/domain/entity/DailySpend';

export class InsightRepositoryImpl implements InsightsRepository {
  constructor(private insightsDatasource: InsightsDatasource) {
  }
  async getMonthlySpend(type: string, startDate?: string, endDate?: string): Promise<Either<Failure, MonthlySpend[]>> {
    try{
      const response = await this.insightsDatasource.getMonthlySpend(type, startDate, endDate);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

  async getTopExpenses(type: string, startDate?: string, endDate?: string): Promise<Either<Failure, TopExpenses[]>> {
    try {
      const response = await this.insightsDatasource.getTopExpenses(type, startDate, endDate);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return Promise.resolve(left(new Failure(errorMessage)));
    }
  }

  async getTotalSpend(type: string, startDate?: string, endDate?: string): Promise<Either<Failure, TotalSpend>> {
    try {
      const response = await this.insightsDatasource.getTotalSpend(type, startDate, endDate);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

  async getTotalSpendByCategory(type: string, startDate: string, endDate: string): Promise<Either<Failure, TotalSpendByCategory[]>> {
    try {
      const response = await this.insightsDatasource.getTotalSpendByCategory(type, startDate, endDate);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

  async getDailySpend(type: string, startDate?: string, endDate?: string): Promise<Either<Failure, DailySpend[]>> {
    try {
      const response = await this.insightsDatasource.getDailySpend(type, startDate, endDate);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }
}