import { AccountRepository } from '@/src/feature/account/domain/repository/account-repository';
import { Either, left, right } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { User } from '@/src/feature/account/domain/entity/user';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { AccountDatasource } from '@/src/feature/account/data/datasource/account-datasource';
import { accountResetPasswordSchema, accountSchema } from '@/src/core/validation/account-validation';
import { Currency } from '@/src/feature/account/domain/entity/currency';
import Error from 'es-errors';

export class AccountRepositoryImpl implements AccountRepository {
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

  async resetPassword(data: typeof accountResetPasswordSchema._type): Promise<Either<Failure, GeneralResponse>> {
    try {
      const response = await this.accountDatasource.resetPassword(data);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

  async updateUser(user: typeof accountSchema._type): Promise<Either<Failure, GeneralResponse>> {
    try {
      const response = await this.accountDatasource.updateUser(user);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

  async getCurrencies(): Promise<Either<Failure, Currency[]>> {
    try {
      const response = await this.accountDatasource.getCurrencies();
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

}