import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';

export interface ExpenseRepository {
  createExpense(amount: number, date: string, description: string, type: string, categoryId: number): Promise<Either<Failure, Expense>>;
  updateExpense(id: number, amount?: number, date?: string, description?: string, type?: string, categoryId?: number): Promise<Either<Failure, Expense>>;
  getAllExpense(startDate: string, endDate: string, categoryId?: number, type?: string, page?: number, pageSize?: number): Promise<Either<Failure, Expense[]>>;
  getExpenseById(id: number): Promise<Either<Failure, Expense>>;
  deleteExpense(id: number): Promise<Either<Failure, GeneralResponse>>
}