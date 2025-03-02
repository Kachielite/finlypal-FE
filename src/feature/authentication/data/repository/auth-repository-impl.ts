import { AuthRepository } from '@/src/feature/authentication/domain/repository/auth-repository';
import { AuthDatasource } from '@/src/feature/authentication/data/datasource/auth-datasource';
import { Either, right, left } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { Auth } from '@/src/feature/authentication/domain/entity/auth';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';

export class AuthRepositoryImpl implements AuthRepository {

  constructor(private readonly authenticationDatasource: AuthDatasource) {}

  async signIn(email: string, password: string): Promise<Either<Failure, Auth>> {
    try {
      const response = await this.authenticationDatasource.signIn(email, password);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

  async signUp(name: string, email: string, password: string): Promise<Either<Failure, Auth>> {
    try {
      const response = await this.authenticationDatasource.signUp(name, email, password);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

  async requestResetPassword(email: string): Promise<Either<Failure, GeneralResponse>> {
    try {
      const response = await this.authenticationDatasource.requestResetPassword(email);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

  async otp(email: string, otp: string): Promise<Either<Failure, GeneralResponse>> {
    try {
      const response = await this.authenticationDatasource.otp(email, otp);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

  async resetPassword(email: string, password: string): Promise<Either<Failure, GeneralResponse>> {
    try {
      const response = await this.authenticationDatasource.resetPassword(email, password);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }


}