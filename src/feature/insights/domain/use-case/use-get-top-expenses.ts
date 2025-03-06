import { InsightsUseCaseParams, UseCase } from '@/src/core/use-case/use-case';
import { TopExpenses } from '@/src/feature/insights/domain/entity/TopExpenses';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { InsightsRepository } from '@/src/feature/insights/domain/repository/insights-repository';

export class GetTopExpensesUseCaseParams extends InsightsUseCaseParams{
  constructor(
    public type: string,
    public startDate?: string,
    public endDate?: string
  ) {
    super(type, startDate, endDate);
  }
}

export class GetTopExpensesUseCase extends UseCase<TopExpenses[], GetTopExpensesUseCaseParams>{
  constructor(private insightsRepository: InsightsRepository) {
    super();
  }

  async execute(params: GetTopExpensesUseCaseParams): Promise<Either<Failure, TopExpenses[]>> {
    return await this.insightsRepository.getTopExpenses(params.type, params.startDate, params.endDate);
  }

}