import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { Budget } from '@/src/feature/budget/domain/entity/budget';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';

export interface BudgetRepository {
  getBudgetById(budgetId: number): Promise<Either<Failure, Budget>>;
  getAllBudgets(page?: number, pageSize?: number): Promise<Either<Failure, Budget[]>>;
  createBudget({budgetName, startDate, endDate, totalBudget}: {budgetName: string, startDate: string, endDate: string, totalBudget: number}): Promise<Either<Failure, Budget>>;
  updateBudget({budgetId, budgetName, startDate, endDate, totalBudget}: {budgetId: number, budgetName: string, startDate: string, endDate: string, totalBudget: number}): Promise<Either<Failure, Budget>>;
  deleteBudget(budgetId: number): Promise<Either<Failure, GeneralResponse>>;
}