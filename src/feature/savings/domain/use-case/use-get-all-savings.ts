import { UseCase } from '@/src/core/use-case/use-case';
import { Savings } from '@/src/feature/savings/domain/entity/savings';
import { SavingsRepository } from '@/src/feature/savings/domain/repository/savings-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class GetAllSavingsUseCaseParams {
  constructor(
    public page: number,
    public pageSize: number
  ) {}
}

export class GetAllSavingsUseCase extends UseCase<Savings[], GetAllSavingsUseCaseParams>{
  constructor(private savingsRepository: SavingsRepository) {
    super();
  }

  async execute(params: GetAllSavingsUseCaseParams): Promise<Either<Failure, Savings[]>> {
    return await this.savingsRepository.getSavings(params.page, params.pageSize);
  }

}