import { UseCase } from '@/src/core/use-case/use-case';
import { BudgetItemsRepository } from '@/src/feature/budget-item/domain/repository/budget-items-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';

export class DeleteBudgetItemUseCaseParams {
  constructor(
    public budgetId: number
  ) {}

}

export class DeleteBudgetItemUseCase extends UseCase<GeneralResponse, DeleteBudgetItemUseCaseParams>{
  constructor(private budgetItemRepository: BudgetItemsRepository) {
    super();
  }

  async execute(params: DeleteBudgetItemUseCaseParams): Promise<Either<Failure, GeneralResponse>> {
    return await this.budgetItemRepository.deleteBudgetItem(params.budgetId);
  }
}