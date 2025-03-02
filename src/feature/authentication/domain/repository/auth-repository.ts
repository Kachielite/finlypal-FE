import {Either} from "fp-ts/Either";
import { Failure } from '@/src/core/error/failure';
import { Auth } from '@/src/feature/authentication/domain/entity/auth';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';

export interface AuthRepository {
  signIn(email: string, password: string): Promise<Either<Failure, Auth>>;
  signUp(name: string, email: string, password: string): Promise<Either<Failure, Auth>>;
  requestResetPassword(email: string): Promise<Either<Failure, GeneralResponse>>;
  verifyOtp(email: string, otp: string): Promise<Either<Failure, GeneralResponse>>;
  resetPassword(email: string, password: string): Promise<Either<Failure, GeneralResponse>>;
}