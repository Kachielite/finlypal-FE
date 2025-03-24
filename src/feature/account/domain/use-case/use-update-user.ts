import { accountSchema } from '@/src/core/validation/account-validation';
import { UseCase } from '@/src/core/use-case/use-case';
import { Failure } from '@/src/core/error/failure';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { AccountRepository } from '@/src/feature/account/domain/repository/account-repository';
import { Either } from 'fp-ts/Either';

export class UpdateUserUseCaseParams {
  constructor(
    public user: typeof accountSchema._type
  ) {
  }
}

export class UpdateUserUseCase extends UseCase<GeneralResponse, UpdateUserUseCaseParams>{
  constructor(private accountRepository: AccountRepository) {
    super();
  }

  async execute(params: UpdateUserUseCaseParams): Promise<Either<Failure, GeneralResponse>> {
    return await this.accountRepository.updateUser(params.user);
  }
}