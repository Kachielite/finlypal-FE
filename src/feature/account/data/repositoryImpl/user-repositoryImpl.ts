import { UserRepository } from '@/src/feature/account/domain/repository/user-repository';
import { Either, left, right } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { User } from '@/src/feature/account/domain/entity/user';
import { userResetPasswordSchema, userSchema } from '@/src/core/validation/user-validation';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { AccountDatasource } from '@/src/feature/account/data/datasource/account-datasource';

export class UserRepositoryImpl implements UserRepository {
  constructor(private accountDatasource: AccountDatasource) {
  }
  async getCurrentUser(): Promise<Either<Failure, User>> {
    try {
      const response = await this.accountDatasource.getCurrentUser();
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

  async resetPassword(data: typeof userResetPasswordSchema._type): Promise<Either<Failure, GeneralResponse>> {
    try {
      const response = await this.accountDatasource.resetPassword(data);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

  async updateUser(user: typeof userSchema._type): Promise<Either<Failure, GeneralResponse>> {
    try {
      const response = await this.accountDatasource.updateUser(user);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

}