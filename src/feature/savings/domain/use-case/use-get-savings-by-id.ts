import { UseCase } from '@/src/core/use-case/use-case';
import { SavingsRepository } from '@/src/feature/savings/domain/repository/savings-repository';
import { Savings } from '@/src/feature/savings/domain/entity/savings';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class GetSavingsByIdUseCaseParams {
  constructor(
    public savingsId: number
  ) {}
}

export class GetSavingsByIdUseCase extends UseCase<Savings, GetSavingsByIdUseCaseParams>{
  constructor(private savingsRepository: SavingsRepository) {
    super();
  }

  async execute(params: GetSavingsByIdUseCaseParams): Promise<Either<Failure, Savings>> {
    return await this.savingsRepository.getSavingsById(params.savingsId);
  }

}