import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { ExpenseModel } from '@/src/feature/expenses/data/model/expense-model';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export interface ExpenseRepository {
  createExpense(amount: number, date: string, description: string, type: string, categoryId: number): Promise<Either<Failure, GeneralResponse>>;
  updateExpense(id: number, amount?: number, date?: string, description?: string, type?: string, categoryId?: number): Promise<Either<Failure, GeneralResponse>>;
  getAllExpense(startDate: string, endDate: string, categoryId?: number, type?: string, page?: number, pageSize?: number): Promise<Either<Failure, ExpenseModel[]>>;
  getExpenseById(id: number): Promise<Either<Failure, ExpenseModel>>;
  deleteExpense(id: number): Promise<Either<Failure, GeneralResponse>>
}