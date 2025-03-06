import { UseCase } from '@/src/core/use-case/use-case';
import { ExpenseRepository } from '@/src/feature/expenses/domain/repository/expense-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';

export class DeleteExpenseUseCaseParams {
  constructor(
    public id: number
  ) {
  }
}

export class DeleteExpenseUseCase extends UseCase<GeneralResponse, DeleteExpenseUseCaseParams>{
  constructor(private expenseRepository: ExpenseRepository) {
    super();
  }

  async execute(params: DeleteExpenseUseCaseParams): Promise<Either<Failure, GeneralResponse>> {
    return await this.expenseRepository.deleteExpense(params.id)
  }

}