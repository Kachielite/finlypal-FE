import { UseCase } from '@/src/core/use-case/use-case';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { ExpenseRepository } from '@/src/feature/expenses/domain/repository/expense-repository';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';

export class UpdateExpenseUseCaseParams{
  constructor(
    public id: number,
    public amount?: number,
    public date?: string,
    public description?: string,
    public type?: string,
    public categoryId?: number
  ) {
  }
}

export class UpdateExpenseUseCase extends UseCase<Expense, UpdateExpenseUseCaseParams>{
  constructor(private expenseRepository: ExpenseRepository) {
    super();

  }

  async execute(params: UpdateExpenseUseCaseParams): Promise<Either<Failure, Expense>> {
    return await this.expenseRepository.updateExpense(params.id, params.amount, params.date, params.description, params.type, params.categoryId)
  }

}