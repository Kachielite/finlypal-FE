import { InsightsUseCaseParams, UseCase } from '@/src/core/use-case/use-case';
import { TotalSpendByCategory } from '@/src/feature/insights/domain/entity/TotalSpendByCategory';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { InsightsRepository } from '@/src/feature/insights/domain/repository/insights-repository';

export class GetTotalSpendByCategoryUseCaseParams extends InsightsUseCaseParams{
  constructor(
    public type: string,
    public startDate: string,
    public endDate: string,
  ) {
    super(type, startDate, endDate);
  }
}

export class GetTotalSpendByCategoryUseCase extends UseCase<TotalSpendByCategory[], GetTotalSpendByCategoryUseCaseParams>{
  constructor(private insightsRepository: InsightsRepository) {
    super();
  }

  async execute(params: GetTotalSpendByCategoryUseCaseParams): Promise<Either<Failure, TotalSpendByCategory[]>> {
    return await this.insightsRepository.getTotalSpendByCategory(params.type, params.startDate, params.endDate);
  }

}