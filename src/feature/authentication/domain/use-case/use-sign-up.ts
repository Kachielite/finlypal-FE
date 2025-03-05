import { UseCase } from '@/src/core/use-case/use-case';
import { Auth } from '@/src/feature/authentication/domain/entity/auth';
import { AuthRepository } from '@/src/feature/authentication/domain/repository/auth-repository';
import { Failure } from '@/src/core/error/failure';
import { Either } from 'fp-ts/Either';

export class SignUpUseCaseParam {
  constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}
}

export class SignUpUseCase extends UseCase<Auth, SignUpUseCaseParam>{
  constructor(private authRepository: AuthRepository) {
    super();
  }

  async execute(params: SignUpUseCaseParam): Promise<Either<Failure, Auth>> {
    return await this.authRepository.signUp(params.name, params.email, params.password);
  }
}