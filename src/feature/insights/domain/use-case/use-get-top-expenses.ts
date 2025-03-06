import { InsightsUseCaseParams, UseCase } from '@/src/core/use-case/use-case';
import { TopExpenses } from '@/src/feature/insights/domain/entity/TopExpenses';
import { InsightRepositoryImpl } from '@/src/feature/insights/data/repositoryImpl/insight-repositoryImp';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

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
  constructor(private insightsRepository: InsightRepositoryImpl) {
    super();
  }

  async execute(params: GetTopExpensesUseCaseParams): Promise<Either<Failure, TopExpenses[]>> {
    return await this.insightsRepository.getTopExpenses(params.type, params.startDate, params.endDate);
  }

}