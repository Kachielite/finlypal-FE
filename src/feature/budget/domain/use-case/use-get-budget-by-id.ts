import { UseCase } from '@/src/core/use-case/use-case';
import { Budget } from '@/src/feature/budget/domain/entity/budget';
import { BudgetRepository } from '@/src/feature/budget/domain/repository/budget-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class GetBudgetByIdBudgetUseCaseParams {
  constructor(public id: number) {}
}

export class GetBudgetByIdBudgetUseCase extends UseCase<Budget, GetBudgetByIdBudgetUseCaseParams>{
  constructor(private budgetRepository: BudgetRepository) {
    super();
  }

  async execute(params: GetBudgetByIdBudgetUseCaseParams): Promise<Either<Failure, Budget>> {
    return await this.budgetRepository.getBudgetById(params.id)
  }
}