import { UseCase } from '@/src/core/use-case/use-case';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';
import { BudgetItemsRepository } from '@/src/feature/budget-item/domain/repository/budget-items-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class GetBudgetItemByIdUseCaseParams {
  constructor(
    public budgetItemId: number
  ) {}

}

export class GetBudgetItemByIdUseCase extends UseCase<BudgetItem, GetBudgetItemByIdUseCaseParams>{
  constructor(private budgetItemRepository: BudgetItemsRepository) {
    super();
  }

  async execute(params: GetBudgetItemByIdUseCaseParams): Promise<Either<Failure, BudgetItem>> {
    return await this.budgetItemRepository.getBudgetItemById(params.budgetItemId);
  }
}