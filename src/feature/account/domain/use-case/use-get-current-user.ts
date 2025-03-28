import { NoParams, UseCase } from '@/src/core/use-case/use-case';
import { User } from '@/src/feature/account/domain/entity/user';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { AccountRepository } from '@/src/feature/account/domain/repository/account-repository';

export class GetCurrentUserUseCase extends UseCase<User, NoParams>{
  constructor(private accountRepository: AccountRepository) {
    super();
  }

  async execute(): Promise<Either<Failure, User>> {
    return await this.accountRepository.getCurrentUser();
  }
}