import { NoParams, UseCase } from '@/src/core/use-case/use-case';
import { User } from '@/src/feature/account/domain/entity/user';
import { AuthRepository } from '@/src/feature/authentication/domain/repository/auth-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class GetCurrentUserUseCase extends UseCase<User, NoParams>{
  constructor(private authRepository: AuthRepository) {
    super();
  }

  async execute(): Promise<Either<Failure, User>> {
    return await this.authRepository.getCurrentUser();
  }
}