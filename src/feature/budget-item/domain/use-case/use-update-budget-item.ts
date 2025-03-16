import { UseCase } from '@/src/core/use-case/use-case';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';
import { BudgetItemsRepository } from '@/src/feature/budget-item/domain/repository/budget-items-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class UpdateBudgetItemUseCaseParams {
  constructor(
    public budgetItemId: number,
    public budgetItem: { name: string; icon: string; allocated_amount: number }
  ) {
  }
}

export class UpdateBudgetItemUseCase extends UseCase<BudgetItem, UpdateBudgetItemUseCaseParams>{
  constructor(private budgetItemRepository: BudgetItemsRepository) {
    super();
  }

  async execute(params: UpdateBudgetItemUseCaseParams): Promise<Either<Failure, BudgetItem>> {
    return await this.budgetItemRepository.updateBudgetItem(params);
  }
}