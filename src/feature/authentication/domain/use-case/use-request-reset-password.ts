import { UseCase } from '@/src/core/use-case/use-case';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { AuthRepository } from '@/src/feature/authentication/domain/repository/auth-repository';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';

export class RequestResetPasswordUseCaseParams {
  constructor(
    public email: string,
  ) {}
}

export class RequestResetPasswordUseCase extends UseCase<GeneralResponse, RequestResetPasswordUseCaseParams>{
  constructor(private authRepository: AuthRepository) {
    super();
  }

  async execute(params: RequestResetPasswordUseCaseParams): Promise<Either<Failure, GeneralResponse>> {
    return await this.authRepository.requestResetPassword(params.email);
  }
}