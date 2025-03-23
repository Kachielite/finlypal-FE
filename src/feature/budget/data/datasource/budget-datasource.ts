import { BudgetModel } from '@/src/feature/budget/data/model/budgetModel';
import { GeneralResponseModel } from '@/src/shared/data/model/general-response-model';
import { BudgetService } from '@/src/core/service/budget';
import { Exception } from '@/src/core/error/exception';

export interface BudgetDatasource {
  getBudgetById(budgetId: number): Promise<BudgetModel>,
  getAllBudgets(page?: number, pageSize?: number): Promise<BudgetModel[]>;
  createBudget({budgetName, icon, startDate, endDate, totalBudget}: {budgetName: string, icon: string, startDate: string, endDate: string, totalBudget: number}): Promise<BudgetModel>;
  updateBudget({budgetId, budgetName, icon, startDate, endDate, totalBudget}: {budgetId: number,  budgetName: string, icon: string, startDate: string, endDate: string, totalBudget: number}): Promise<BudgetModel>;
  markBudgetAsCompleted(budgetId: number): Promise<GeneralResponseModel>;
  deleteBudget(budgetId: number): Promise<GeneralResponseModel>;
}

export class BudgetDatasourceImpl implements BudgetDatasource {
  constructor(private budgetService: BudgetService) {}

  async getBudgetById(budgetId: number): Promise<BudgetModel> {
    try {
      const response = await this.budgetService.getBudget(budgetId.toString());
      return BudgetModel.fromJson(response)
    } catch (error: unknown) {
      console.error("Could not fetch budget by id => budget datasource", error)
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
      console.error("Could not fetch budgets => budget datasource", error)
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
  async createBudget({budgetName, icon, startDate, endDate, totalBudget}: {budgetName: string, icon: string, startDate: string, endDate: string, totalBudget: number}): Promise<BudgetModel> {
    try{
      const response = await this.budgetService.createBudget({budgetName, icon, startDate, endDate, totalBudget});
      return BudgetModel.fromJson(response);
    } catch (error: unknown) {
      console.error("Could not create budget => budget datasource", error)
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
  async updateBudget({budgetId, budgetName, icon, startDate, endDate, totalBudget}: {budgetId: number, budgetName: string, icon: string, startDate: string, endDate: string, totalBudget: number}): Promise<BudgetModel> {
    try {
      const response = await this.budgetService.updateBudget({budgetId, budgetName, icon, startDate, endDate, totalBudget});
      return BudgetModel.fromJson(response);
    } catch (error: unknown) {
      console.error("Could not update budget => budget datasource", error)
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
      console.error("Could not delete budget => budget datasource", error)
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  markBudgetAsCompleted(budgetId: number): Promise<GeneralResponseModel> {
    try {
      return this.budgetService.markBudgetAsCompleted(budgetId);
    } catch (error: unknown) {
      console.error("Could not mark budget as deleted => budget datasource", error)
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
}