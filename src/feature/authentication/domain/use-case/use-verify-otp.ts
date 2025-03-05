import { UseCase } from '@/src/core/use-case/use-case';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { Failure } from '@/src/core/error/failure';
import { AuthRepository } from '@/src/feature/authentication/domain/repository/auth-repository';
import { Either } from 'fp-ts/Either';

export class VerifyOtpUseCaseParams {
  constructor(
    public otp: string,
    public email: string,
  ) {}
}

export class VerifyOtpUseCase extends UseCase<GeneralResponse, VerifyOtpUseCaseParams>{
  constructor(private authRepository: AuthRepository) {
    super();
  }

  async execute(params: VerifyOtpUseCaseParams): Promise<Either<Failure, GeneralResponse>> {
    return await this.authRepository.verifyOtp(params.email, params.otp);
  }

}