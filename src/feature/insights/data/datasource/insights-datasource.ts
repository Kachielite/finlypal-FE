import { DailySpendModel } from '@/src/feature/insights/data/model/DailySpendModel';
import { MonthlySpendModel } from '@/src/feature/insights/data/model/MonthlySpendModel';
import { TotalExpensesModel } from '@/src/feature/insights/data/model/TotalExpensesModel';
import { Exception } from '@/src/core/error/exception';
import { TotalSpendModel } from '@/src/feature/insights/data/model/TotalSpendModel';

export interface InsightsDatasource{
  getDailySpend(type: string, startDate?: string, endDate?: string): Promise<DailySpendModel[]>;
  getMonthlySpend(type: string, startDate?: string, endDate?: string): Promise<MonthlySpendModel[]>;
  getTotalExpenses(type: string, startDate?: string, endDate?: string): Promise<TotalExpensesModel[]>;
  getTotalSpendByCategory(type: string, startDate?: string, endDate?: string): Promise<TotalExpensesModel[]>;
  getTotalSpend(type: string, startDate?: string, endDate?: string): Promise<TotalSpendModel>;
}

export class InsightsDatasourceImpl implements InsightsDatasource {
  constructor(private datasource: InsightsDatasource) {
  }

  async getDailySpend(type: string, startDate?: string, endDate?: string): Promise<DailySpendModel[]> {
    try {
      const response = await this.datasource.getDailySpend(type, startDate, endDate);
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
      const response = await this.datasource.getMonthlySpend(type, startDate, endDate);
      return MonthlySpendModel.fromJsonList(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async getTotalExpenses(type: string, startDate?: string, endDate?: string): Promise<TotalExpensesModel[]> {
    try {
      const response = await this.datasource.getTotalExpenses(type, startDate, endDate);
      return TotalExpensesModel.fromJsonList(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async getTotalSpendByCategory(type: string, startDate?: string, endDate?: string): Promise<TotalExpensesModel[]> {
    try {
      const response = await this.datasource.getTotalSpendByCategory(type, startDate, endDate);
      return TotalExpensesModel.fromJsonList(response);
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
      const response = await this.datasource.getTotalSpend(type, startDate, endDate);
      return TotalSpendModel.fromJson(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

}