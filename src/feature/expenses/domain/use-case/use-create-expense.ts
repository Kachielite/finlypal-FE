import { UseCase } from '@/src/core/use-case/use-case';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { ExpenseRepository } from '@/src/feature/expenses/domain/repository/expense-repository';

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

export class CreateExpenseUseCase extends UseCase<GeneralResponse, CreateExpenseUseCaseParams>{
  constructor(private expenseRepository: ExpenseRepository) {
    super();
  }
  async execute(params: CreateExpenseUseCaseParams): Promise<Either<Failure, GeneralResponse>> {
    return await this.expenseRepository.createExpense(params.amount, params.date, params.description, params.type, params.categoryId);
  }

}