import { accountSchema } from '@/src/core/validation/account-validation';
import { UseCase } from '@/src/core/use-case/use-case';
import { Failure } from '@/src/core/error/failure';
import { AccountRepository } from '@/src/feature/account/domain/repository/account-repository';
import { Either } from 'fp-ts/Either';
import { User } from '@/src/feature/account/domain/entity/user';

export class UpdateUserUseCaseParams {
  constructor(
    public user: typeof accountSchema._type,
    public userId: number
  ) {
  }
}

export class UpdateUserUseCase extends UseCase<User, UpdateUserUseCaseParams>{
  constructor(private accountRepository: AccountRepository) {
    super();
  }

  async execute(params: UpdateUserUseCaseParams): Promise<Either<Failure, User>> {
    return await this.accountRepository.updateUser(params.user, params.userId);
  }
}