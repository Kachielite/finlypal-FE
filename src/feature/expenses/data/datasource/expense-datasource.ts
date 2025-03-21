import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { ExpenseModel } from '@/src/feature/expenses/data/model/expense-model';
import { ExpensesService } from '@/src/core/service/expenses';
import { Exception } from '@/src/core/error/exception';

export interface ExpenseDatasource {
  createExpense(amount: number, date: string, description: string, type: string, categoryId: number, budgetItemId?: number, savingsID?: number): Promise<ExpenseModel>;
  updateExpense(id: number, amount?: number, date?: string, description?: string, type?: string, categoryId?: number, budgetItemId?: number, savingsID?: number): Promise<ExpenseModel>;
  getAllExpense(startDate: string, endDate: string, categoryId?: number, type?: string, page?: number, pageSize?: number): Promise<ExpenseModel[]>;
  getExpenseById(id: number): Promise<ExpenseModel>;
  deleteExpense(id: number): Promise<GeneralResponse>
}

export class ExpenseDatasourceImpl implements ExpenseDatasource{
  constructor(private expensesService: ExpensesService) {
  }

  async createExpense(amount: number, date: string, description: string, type: string, categoryId: number, budgetItemId?: number, savingsID?: number): Promise<ExpenseModel> {
    try{
      const response = await this.expensesService.createExpense(amount, date, description, type, categoryId, budgetItemId, savingsID);
      return ExpenseModel.fromJson(response)
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async deleteExpense(id: number): Promise<GeneralResponse> {
    try{
      const response = await this.expensesService.deleteExpenseById(id);
      return GeneralResponse.fromJson(response)
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async getAllExpense(startDate: string, endDate: string, categoryId?: number, type?: string, page?: number, pageSize?: number): Promise<ExpenseModel[]> {
    try{
      const response = await this.expensesService.getExpense(startDate, endDate, categoryId, type, page, pageSize);
      return ExpenseModel.fromJsonList(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async getExpenseById(id: number): Promise<ExpenseModel> {
    try {
      const response = await this.expensesService.getExpenseById(id);
      return ExpenseModel.fromJson(response)
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async updateExpense(id: number, amount?: number, date?: string, description?: string, type?: string, categoryId?: number, budgetItemId?: number, savingsID?: number): Promise<ExpenseModel> {
    try{
      const response = await this.expensesService.updateExpense(id, amount, date, description, type, categoryId, budgetItemId, savingsID);
      return ExpenseModel.fromJson(response)
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

}