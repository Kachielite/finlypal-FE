import { SavingsSchema } from '@/src/core/validation/savings-validation';
import { Savings } from '@/src/feature/savings/domain/entity/savings';
import { UseCase } from '@/src/core/use-case/use-case';
import { SavingsRepository } from '@/src/feature/savings/domain/repository/savings-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class UpdateSavingsUseCaseParams {
  constructor(
    public savingsId: number,
    public data: typeof SavingsSchema._type
  ) {}
}

export class UpdateSavingsUseCase extends UseCase<Savings, UpdateSavingsUseCaseParams>{
  constructor(private savingsRepository: SavingsRepository) {
    super();
  }

  async execute(params: UpdateSavingsUseCaseParams): Promise<Either<Failure, Savings>> {
    return await this.savingsRepository.updateSavings(params.data, params.savingsId);
  }

}