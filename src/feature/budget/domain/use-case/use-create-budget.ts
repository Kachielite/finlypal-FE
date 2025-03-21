import { UseCase } from '@/src/core/use-case/use-case';
import { Budget } from '@/src/feature/budget/domain/entity/budget';
import { BudgetRepository } from '@/src/feature/budget/domain/repository/budget-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class CreateBudgetUseCaseParams {
  constructor(
    public budgetName: string,
    public icon: string,
    public startDate: string,
    public endDate: string,
    public totalBudget: number
  ) {
  }
}

export class CreateBudgetUseCase extends UseCase<Budget, CreateBudgetUseCaseParams>{
  constructor(private budgetRepository: BudgetRepository) {
    super();
  }

  async execute(params: CreateBudgetUseCaseParams): Promise<Either<Failure, Budget>> {
    return await this.budgetRepository.createBudget({
      budgetName: params.budgetName,
      icon: params.icon,
      startDate: params.startDate,
      endDate: params.endDate,
      totalBudget: params.totalBudget
    })
  }
}