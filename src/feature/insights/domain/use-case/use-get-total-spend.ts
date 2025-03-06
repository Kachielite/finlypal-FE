import { InsightsUseCaseParams, UseCase } from '@/src/core/use-case/use-case';
import { TotalSpend } from '@/src/feature/insights/domain/entity/TotalSpend';
import { InsightRepositoryImpl } from '@/src/feature/insights/data/repositoryImpl/insight-repositoryImp';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class GetTotalSpendUseCaseParams extends InsightsUseCaseParams{
  constructor(
    public type: string,
    public startDate?: string,
    public endDate?: string
  ) {
    super(type, startDate, endDate);
  }
}

export class GetTotalSpendUseCase extends UseCase<TotalSpend, GetTotalSpendUseCaseParams>{
  constructor(private insightsRepository: InsightRepositoryImpl) {
    super();
  }

  async execute(params: GetTotalSpendUseCaseParams): Promise<Either<Failure, TotalSpend>> {
    return await this.insightsRepository.getTotalSpend(params.type, params.startDate, params.endDate);
  }
}

