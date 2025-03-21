import { UseCase } from '@/src/core/use-case/use-case';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';
import { BudgetItemsRepository } from '@/src/feature/budget-item/domain/repository/budget-items-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class GetBudgetItemsUseCaseParams {
  constructor(
    public budgetId: number
  ) {}

}


export class GetBudgetItemsUseCase extends UseCase<BudgetItem[], GetBudgetItemsUseCaseParams>{
  constructor(private budgetItemRepository: BudgetItemsRepository) {
    super();
  }

  async execute(params: GetBudgetItemsUseCaseParams): Promise<Either<Failure, BudgetItem[]>> {
    return await this.budgetItemRepository.getBudgetItems(params.budgetId);
  }
}