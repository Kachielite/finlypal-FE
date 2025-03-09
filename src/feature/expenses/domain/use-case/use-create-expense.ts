import { UseCase } from '@/src/core/use-case/use-case';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { ExpenseRepository } from '@/src/feature/expenses/domain/repository/expense-repository';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';

export class CreateExpenseUseCaseParams {
  constructor(
    public amount: number,
    public date: string,
    public description: string,
    public type: string,
    public categoryId: number
  ) {
  }
}

export class CreateExpenseUseCase extends UseCase<Expense, CreateExpenseUseCaseParams>{
  constructor(private expenseRepository: ExpenseRepository) {
    super();
  }
  async execute(params: CreateExpenseUseCaseParams): Promise<Either<Failure, Expense>> {
    return await this.expenseRepository.createExpense(params.amount, params.date, params.description, params.type, params.categoryId);
  }

}