import { accountResetPasswordSchema } from '@/src/core/validation/account-validation';
import { UseCase } from '@/src/core/use-case/use-case';
import { Failure } from '@/src/core/error/failure';
import { AccountRepository } from '@/src/feature/account/domain/repository/account-repository';
import { Either } from 'fp-ts/Either';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';

export class ResetPasswordUserUseCaseParams {
  constructor(
    public data: typeof accountResetPasswordSchema._type,
    public userId: number
  ) {
  }
}

export class ResetPasswordUserUseCase extends UseCase<GeneralResponse, ResetPasswordUserUseCaseParams>{
  constructor(private accountRepository: AccountRepository) {
    super();
  }

  async execute(params: ResetPasswordUserUseCaseParams): Promise<Either<Failure,GeneralResponse >> {
    return await this.accountRepository.resetPassword(params.data, params.userId);
  }
}