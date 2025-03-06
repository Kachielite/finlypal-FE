import { InsightsUseCaseParams, UseCase } from '@/src/core/use-case/use-case';
import { MonthlySpend } from '@/src/feature/insights/domain/entity/MonthlySpend';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { InsightRepositoryImpl } from '@/src/feature/insights/data/repositoryImpl/insight-repositoryImp';

export class GetMonthlySpendUseCaseParams extends InsightsUseCaseParams{
  constructor(
    public type: string,
    public startDate: string,
    public endDate: string
  ) {
    super(type, startDate, endDate);
  }
}


export class GetMonthlySpendUseCase extends UseCase<MonthlySpend[], GetMonthlySpendUseCaseParams>{
  constructor(private insightRepository: InsightRepositoryImpl) {
    super();
  }
  async execute(params: GetMonthlySpendUseCaseParams): Promise<Either<Failure, MonthlySpend[]>> {
    return await this.insightRepository.getMonthlySpend(params.type, params.startDate, params.endDate);
  }

}