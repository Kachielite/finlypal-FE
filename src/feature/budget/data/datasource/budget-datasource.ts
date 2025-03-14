import { BudgetModel } from '@/src/feature/budget/data/model/budgetModel';
import { GeneralResponseModel } from '@/src/shared/data/model/general-response-model';
import { BudgetService } from '@/src/core/service/budget';
import { Exception } from '@/src/core/error/exception';

export interface BudgetDatasource {
  getBudgetById(budgetId: number): Promise<BudgetModel>,
  getAllBudgets(page?: number, pageSize?: number): Promise<BudgetModel[]>;
  createBudget({budgetName, startDate, endDate, totalBudget}: {budgetName: string, startDate: string, endDate: string, totalBudget: number}): Promise<BudgetModel>;
  updateBudget({budgetId, budgetName, startDate, endDate, totalBudget}: {budgetId: number, budgetName: string, startDate: string, endDate: string, totalBudget: number}): Promise<BudgetModel>;
  deleteBudget(budgetId: number): Promise<GeneralResponseModel>;
}

export class BudgetDatasourceImpl implements BudgetDatasource {
  constructor(private budgetService: BudgetService) {}

  async getBudgetById(budgetId: number): Promise<BudgetModel> {
    try {
      const response = await this.budgetService.getBudget(budgetId.toString());
      return BudgetModel.fromJson(response)
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
  async getAllBudgets(page?: number, pageSize?: number): Promise<BudgetModel[]> {
    try {
      const response = await this.budgetService.getAllBudgets(page, pageSize);
      return BudgetModel.fromJsonList(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
  async createBudget({budgetName, startDate, endDate, totalBudget}: {budgetName: string, startDate: string, endDate: string, totalBudget: number}): Promise<BudgetModel> {
    try{
      const response = await this.budgetService.createBudget({budgetName, startDate, endDate, totalBudget});
      return BudgetModel.fromJson(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
  async updateBudget({budgetId, budgetName, startDate, endDate, totalBudget}: {budgetId: number, budgetName: string, startDate: string, endDate: string, totalBudget: number}): Promise<BudgetModel> {
    try {
      const response = await this.budgetService.updateBudget({budgetId, budgetName, startDate, endDate, totalBudget});
      return BudgetModel.fromJson(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
  async deleteBudget(budgetId: number): Promise<GeneralResponseModel> {
    try {
      const response = await this.budgetService.deleteBudget(budgetId.toString());
      return GeneralResponseModel.fromJson(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
}