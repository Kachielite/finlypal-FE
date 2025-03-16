import { UseCase } from '@/src/core/use-case/use-case';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';
import { BudgetItemRepository } from '@/src/feature/budget-item/domain/repository/budget-item-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class GetBudgetItemByIdUseCaseParams {
  constructor(
    public budgetId: number
  ) {}

}

export class GetBudgetItemByIdUseCase extends UseCase<BudgetItem, GetBudgetItemByIdUseCaseParams>{
  constructor(private budgetItemRepository: BudgetItemRepository) {
    super();
  }

  async execute(params: GetBudgetItemByIdUseCaseParams): Promise<Either<Failure, BudgetItem>> {
    return await this.budgetItemRepository.getBudgetItemById(params.budgetId);
  }
}