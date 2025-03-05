import { UseCase } from '@/src/core/use-case/use-case';
import { Auth } from '@/src/feature/authentication/domain/entity/auth';
import { AuthRepository } from '@/src/feature/authentication/domain/repository/auth-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class SignInUseCaseParams {
  constructor(
    public email: string,
    public password: string,
  ) {}
}

export class SignInUseCase extends UseCase<Auth, SignInUseCaseParams>{
  constructor(private authRepository: AuthRepository) {
    super();
  }

  async execute(params: SignInUseCaseParams): Promise<Either<Failure, Auth>> {
    return await this.authRepository.signIn(params.email, params.password);
  }
}