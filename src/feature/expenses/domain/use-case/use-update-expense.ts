import { UseCase } from '@/src/core/use-case/use-case';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { ExpenseRepository } from '@/src/feature/expenses/domain/repository/expense-repository';

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

export class UpdateExpenseUseCase extends UseCase<GeneralResponse, UpdateExpenseUseCaseParams>{
  constructor(private expenseRepository: ExpenseRepository) {
    super();

  }

  async execute(params: UpdateExpenseUseCaseParams): Promise<Either<Failure, GeneralResponse>> {
    return await this.expenseRepository.updateExpense(params.id, params.amount, params.date, params.description, params.type, params.categoryId)
  }

}