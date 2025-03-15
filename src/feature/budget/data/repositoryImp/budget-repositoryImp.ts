import { BudgetRepository } from '@/src/feature/budget/domain/repository/budget-repository';
import { Either, left, right } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { Budget } from '@/src/feature/budget/domain/entity/budget';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { BudgetDatasource } from '@/src/feature/budget/data/datasource/budget-datasource';
import Error from 'es-errors';

export class BudgetRepositoryImpl implements BudgetRepository {
  constructor(private budgetDatasource: BudgetDatasource) {
  }
  async createBudget({ budgetName, icon, startDate, endDate, totalBudget }: {
    budgetName: string;
    icon: string;
    startDate: string;
    endDate: string;
    totalBudget: number
  }): Promise<Either<Failure, Budget>> {
    try {
      const budget = await this.budgetDatasource.createBudget({ budgetName, icon, startDate, endDate, totalBudget });
      return right(budget);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while creating budget";
      return left(new Failure(errorMessage));
    }
  }

  async deleteBudget(budgetId: number): Promise<Either<Failure, GeneralResponse>> {
    try {
      const response = await this.budgetDatasource.deleteBudget(budgetId);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred deleting budget";
      return left(new Failure(errorMessage));
    }
  }

  async getAllBudgets(page?: number, pageSize?: number): Promise<Either<Failure, Budget[]>> {
    try {
      const budgets = await this.budgetDatasource.getAllBudgets(page, pageSize);
      return right(budgets);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while getting budgets";
      return left(new Failure(errorMessage));
    }
  }

  async getBudgetById(budgetId: number): Promise<Either<Failure, Budget>> {
    try {
      const budget = await this.budgetDatasource.getBudgetById(budgetId);
      return right(budget);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while getting budget";
      return left(new Failure(errorMessage));
    }
  }

  async updateBudget({ budgetId, budgetName, icon, startDate, endDate, totalBudget }: {
    budgetId: number;
    budgetName: string;
    icon: string;
    startDate: string;
    endDate: string;
    totalBudget: number
  }): Promise<Either<Failure, Budget>> {
    try {
      const budget = await this.budgetDatasource.updateBudget({ budgetId, budgetName, icon, startDate, endDate, totalBudget });
      return right(budget);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while updating budget";
      return left(new Failure(errorMessage));
    }
  }
}