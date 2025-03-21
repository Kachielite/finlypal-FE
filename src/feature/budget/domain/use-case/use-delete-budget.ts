import { UseCase } from '@/src/core/use-case/use-case';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { BudgetRepository } from '@/src/feature/budget/domain/repository/budget-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class DeleteBudgetUseCaseParams {
  constructor(public budgetId: number) {}
}

export class DeleteBudgetUseCase extends UseCase<GeneralResponse, DeleteBudgetUseCaseParams>{
  constructor(private budgetRepository: BudgetRepository) {
    super();
  }

  async execute(params: DeleteBudgetUseCaseParams): Promise<Either<Failure, GeneralResponse>> {
    return await this.budgetRepository.deleteBudget(params.budgetId);
  }
}
