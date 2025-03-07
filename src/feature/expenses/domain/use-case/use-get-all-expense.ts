import { UseCase } from '@/src/core/use-case/use-case';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';
import { ExpenseRepository } from '@/src/feature/expenses/domain/repository/expense-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class GetAllExpenseUseCaseParams{
  constructor(
    public startDate: string,
    public endDate: string,
    public categoryId?: number,
    public type?: string,
    public page?: number,
    public pageSize?: number
  ) {
  }
}

export class GetAllExpenseUseCase extends UseCase<Expense[], GetAllExpenseUseCaseParams>{
  constructor(private expenseRepository: ExpenseRepository) {
    super();
  }

  async execute(params: GetAllExpenseUseCaseParams): Promise<Either<Failure, Expense[]>> {
    return await this.expenseRepository.getAllExpense(params.startDate, params.endDate, params.categoryId, params.type, params.page, params.pageSize);
  }
}