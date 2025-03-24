import { Failure } from '@/src/core/error/failure';
import { User } from '@/src/feature/account/domain/entity/user';
import { Either } from 'fp-ts/Either';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { userResetPasswordSchema, userSchema } from '@/src/core/validation/user-validation';

export interface UserRepository{
  getCurrentUser(): Promise<Either<Failure, User>>;
  updateUser(user: typeof userSchema._type): Promise<Either<Failure, GeneralResponse>>;
  resetPassword(data: typeof userResetPasswordSchema._type): Promise<Either<Failure, GeneralResponse>>;
}