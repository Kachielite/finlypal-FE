import { UseCase } from '@/src/core/use-case/use-case';
import { Budget } from '@/src/feature/budget/domain/entity/budget';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { BudgetRepository } from '@/src/feature/budget/domain/repository/budget-repository';

export class GetAllBudgetUseCaseParams {
  page?: number;
  pageSize?: number;
}

export class GetBudgetUseCaseParams extends UseCase<Budget[], GetAllBudgetUseCaseParams>{
  constructor(private budgetRepository: BudgetRepository) {
    super();
  }
  async execute(params: GetAllBudgetUseCaseParams): Promise<Either<Failure, Budget[]>> {
    return await this.budgetRepository.getAllBudgets(params.page, params.pageSize);
  }
}