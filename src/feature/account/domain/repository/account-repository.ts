import { Failure } from '@/src/core/error/failure';
import { User } from '@/src/feature/account/domain/entity/user';
import { Either } from 'fp-ts/Either';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { accountResetPasswordSchema, accountSchema } from '@/src/core/validation/account-validation';
import { Currency } from '@/src/feature/account/domain/entity/currency';

export interface AccountRepository {
  getCurrentUser(): Promise<Either<Failure, User>>;
  updateUser(user: typeof accountSchema._type, userId: number): Promise<Either<Failure, User>>;
  resetPassword(data: typeof accountResetPasswordSchema._type, userId: number): Promise<Either<Failure, GeneralResponse>>;
  getCurrencies(): Promise<Either<Failure, Currency[]>>
}