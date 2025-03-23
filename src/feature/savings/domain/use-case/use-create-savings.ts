import { UseCase } from '@/src/core/use-case/use-case';
import { Savings } from '@/src/feature/savings/domain/entity/savings';
import { SavingsRepository } from '@/src/feature/savings/domain/repository/savings-repository';
import { Failure } from '@/src/core/error/failure';
import { Either } from 'fp-ts/Either';
import { SavingsSchema } from '@/src/core/validation/savings-validation';

export class CreateSavingsUseCaseParams {
  constructor(
    public data: typeof SavingsSchema._type
  ) {
  }
}

export class CreateSavingsUseCase extends UseCase<Savings, CreateSavingsUseCaseParams>{
  constructor(private savingsRepository: SavingsRepository) {
    super();
  }

  async execute(params: CreateSavingsUseCaseParams): Promise<Either<Failure, Savings>> {
    return await this.savingsRepository.createSavings(params.data);
  }

}