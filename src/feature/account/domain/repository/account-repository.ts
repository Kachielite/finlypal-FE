import { Failure } from '@/src/core/error/failure';
import { User } from '@/src/feature/account/domain/entity/user';
import { Either } from 'fp-ts/Either';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { accountResetPasswordSchema, accountSchema } from '@/src/core/validation/account-validation';

export interface AccountRepository {
  getCurrentUser(): Promise<Either<Failure, User>>;
  updateUser(user: typeof accountSchema._type): Promise<Either<Failure, GeneralResponse>>;
  resetPassword(data: typeof accountResetPasswordSchema._type): Promise<Either<Failure, GeneralResponse>>;
}