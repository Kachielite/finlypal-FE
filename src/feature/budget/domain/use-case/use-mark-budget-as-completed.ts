import { UseCase } from '@/src/core/use-case/use-case';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { BudgetRepository } from '@/src/feature/budget/domain/repository/budget-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class MarkBudgetAsCompletedUseCaseParams {
  constructor(public budgetId: number) {}
}

export class MarkBudgetAsCompletedUseCase extends UseCase<GeneralResponse, MarkBudgetAsCompletedUseCaseParams>{
  constructor(private budgetRepository: BudgetRepository) {
    super();
  }

  async execute(params: MarkBudgetAsCompletedUseCaseParams): Promise<Either<Failure, GeneralResponse>> {
    return await this.budgetRepository.markBudgetAsCompleted(params.budgetId);
  }
}