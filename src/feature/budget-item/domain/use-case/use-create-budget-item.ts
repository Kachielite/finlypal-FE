import { UseCase } from '@/src/core/use-case/use-case';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { BudgetItemsRepository } from '@/src/feature/budget-item/domain/repository/budget-items-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class CreateBudgetItemUseCaseParams {
  constructor(
    public budgetId: number,
    public budgetItems: { name: string; icon: string; allocated_amount: number }[]
  ) {
  }
}

export class CreateBudgetItemUseCase extends UseCase<GeneralResponse, CreateBudgetItemUseCaseParams>{
  constructor(private budgetItemRepository: BudgetItemsRepository) {
    super();
  }

  async execute(params: CreateBudgetItemUseCaseParams): Promise<Either<Failure, GeneralResponse>> {
    return await this.budgetItemRepository.createBudgetItem(params);
  }
}