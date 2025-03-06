import { InsightsUseCaseParams, UseCase } from '@/src/core/use-case/use-case';
import { DailySpend } from '@/src/feature/insights/domain/entity/DailySpend';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { InsightRepositoryImpl } from '@/src/feature/insights/data/repositoryImpl/insight-repositoryImp';

export class GetDailySpendUseCaseParams extends InsightsUseCaseParams{
  constructor(
    public type: string,
    public startDate?: string,
    public endDate?: string
  ) {
    super(type, startDate, endDate);
  }
}

export class GetDailySpendUseCase extends UseCase<DailySpend[], GetDailySpendUseCaseParams>{
  constructor(private insightsRepository: InsightRepositoryImpl) {
    super();
  }

  async execute(params: GetDailySpendUseCaseParams): Promise<Either<Failure, DailySpend[]>> {
    return await this.insightsRepository.getDailySpend(params.type, params.startDate, params.endDate);
  }

}