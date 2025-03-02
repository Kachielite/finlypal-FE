import { UseCase } from '@/src/core/use-case/use-case';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { AuthRepository } from '@/src/feature/authentication/domain/repository/auth-repository';
import { Failure } from '@/src/core/error/failure';
import { Either } from 'fp-ts/Either';

export class ResetPasswordUseCaseParams {
  constructor(
    public email: string,
    public password: string
  ) {
  }
}

export class ResetPasswordUseCase extends UseCase<GeneralResponse, ResetPasswordUseCaseParams>{
  constructor(private authRepository: AuthRepository) {
    super();
  }

  async execute(params: ResetPasswordUseCaseParams): Promise<Either<Failure, GeneralResponse>> {
    return await this.authRepository.resetPassword(params.email, params.password);
  }
}