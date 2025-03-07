import { DailySpendModel } from '@/src/feature/insights/data/model/DailySpendModel';
import { MonthlySpendModel } from '@/src/feature/insights/data/model/MonthlySpendModel';
import { TopExpensesModel } from '@/src/feature/insights/data/model/TopExpensesModel';
import { Exception } from '@/src/core/error/exception';
import { TotalSpendModel } from '@/src/feature/insights/data/model/TotalSpendModel';
import { InsightsService } from '@/src/core/service/insights';
import { TotalSpendByCategoryModel } from '@/src/feature/insights/data/model/TotalSpendByCategoryModel';

export interface InsightsDatasource{
  getDailySpend(type: string, startDate?: string, endDate?: string): Promise<DailySpendModel[]>;
  getMonthlySpend(type: string, startDate?: string, endDate?: string): Promise<MonthlySpendModel[]>;
  getTopExpenses(type: string, startDate?: string, endDate?: string): Promise<TopExpensesModel[]>;
  getTotalSpendByCategory(type: string, startDate: string, endDate: string): Promise<TotalSpendByCategoryModel[]>;
  getTotalSpend(type: string, startDate?: string, endDate?: string): Promise<TotalSpendModel>;
}

export class InsightsDatasourceImpl implements InsightsDatasource {
  constructor(private insightService: InsightsService) {
  }

  async getDailySpend(type: string, startDate?: string, endDate?: string): Promise<DailySpendModel[]> {
    try {
      const response = await this.insightService.getDailySpend(type, startDate, endDate);
      return DailySpendModel.fromJsonList(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async getMonthlySpend(type: string, startDate?: string, endDate?: string): Promise<MonthlySpendModel[]> {
    try {
      const response = await this.insightService.getMonthlySpend(type, startDate, endDate);
      return MonthlySpendModel.fromJsonList(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async getTopExpenses(type: string, startDate?: string, endDate?: string): Promise<TopExpensesModel[]> {
    try {
      const response = await this.insightService.getTopExpenses(type, startDate, endDate);
      return TopExpensesModel.fromJsonList(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async getTotalSpendByCategory(type: string, startDate: string, endDate: string): Promise<TotalSpendByCategoryModel[]> {
    try {
      const response = await this.insightService.getTotalSpendByCategory(type, startDate, endDate);
      return TotalSpendByCategoryModel.fromJsonList(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async getTotalSpend(type: string, startDate?: string, endDate?: string): Promise<TotalSpendModel> {
    try {
      const response = await this.insightService.getTotalSpend(type, startDate, endDate);
      return TotalSpendModel.fromJson(response);
    } catch (error: unknown) {
      console.error("failed to fetch expenses", error)
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

}