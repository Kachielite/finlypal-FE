import { UseCase } from '@/src/core/use-case/use-case';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { SavingsRepository } from '@/src/feature/savings/domain/repository/savings-repository';
import { Failure } from '@/src/core/error/failure';
import { Either } from 'fp-ts/Either';

export class DeleteSavingsUseCaseParams {
  constructor(
    public savingsId: number
  ) {}
}

export class DeleteSavingsUseCase extends UseCase<GeneralResponse, DeleteSavingsUseCaseParams>{
  constructor(private savingsRepository: SavingsRepository) {
    super();
  }

  async execute(params: DeleteSavingsUseCaseParams): Promise<Either<Failure, GeneralResponse>> {
    return await this.savingsRepository.deleteSavings(params.savingsId);
  }

}