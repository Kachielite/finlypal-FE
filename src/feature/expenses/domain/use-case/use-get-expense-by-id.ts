import { UseCase } from '@/src/core/use-case/use-case';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';
import { ExpenseRepository } from '@/src/feature/expenses/domain/repository/expense-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class GetExpenseByIdUseCaseParams {
  constructor(
    public id: number
  ) {
  }
}

export class GetExpenseByIdUseCase extends UseCase<Expense, GetExpenseByIdUseCaseParams>{
  constructor(private expenseRepository: ExpenseRepository) {
    super();
  }

  async execute(params: GetExpenseByIdUseCaseParams): Promise<Either<Failure, Expense>> {
    return await this.expenseRepository.getExpenseById(params.id)
  }

}