import { ExpenseRepository } from '@/src/feature/expenses/domain/repository/expense-repository';
import { Either, left, right } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { ExpenseModel } from '@/src/feature/expenses/data/model/expense-model';
import { ExpenseDatasource } from '@/src/feature/expenses/data/datasource/expense-datasource';
import Error from 'es-errors';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';

export class ExpenseRepositoryImpl implements ExpenseRepository{
  constructor(private expenseDatasource: ExpenseDatasource) {
  }

  async createExpense(amount: number, date: string, description: string, type: string, categoryId: number, budgetItemId?: number, savingsID?: number): Promise<Either<Failure, Expense>> {
    try{
      const response =  await this.expenseDatasource.createExpense(amount, date, description, type, categoryId, budgetItemId, savingsID);
      return right(response)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

  async deleteExpense(id: number): Promise<Either<Failure, GeneralResponse>> {
    try{
      const response = await this.expenseDatasource.deleteExpense(id);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

  async getAllExpense(startDate: string, endDate: string, categoryId?: number, type?: string, page?: number, pageSize?: number): Promise<Either<Failure, ExpenseModel[]>> {
    try {
      const response = await this.expenseDatasource.getAllExpense(startDate, endDate, categoryId, type, page, pageSize);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

  async getExpenseById(id: number): Promise<Either<Failure, ExpenseModel>> {
    try {
      const response = await this.expenseDatasource.getExpenseById(id);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

  async updateExpense(id: number, amount?: number, date?: string, description?: string, type?: string, categoryId?: number, budgetItemId?: number, savingsID?: number): Promise<Either<Failure, Expense>> {
    try {
      const response = await this.expenseDatasource.updateExpense(id, amount, date, description, type, categoryId, budgetItemId, savingsID);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

}