import { SavingsRepository } from '@/src/feature/savings/domain/repository/savings-repository';
import { SavingsDatasource } from '@/src/feature/savings/data/datasource/savings-datasource';
import { SavingsSchema } from '@/src/core/validation/savings-validation';
import { Either, left, right } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { Savings } from '@/src/feature/savings/domain/entity/savings';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import Error from 'es-errors';

export class SavingsRepositoryImpl implements SavingsRepository {
  constructor(private datasource: SavingsDatasource) {
  }

  async createSavings(data: typeof SavingsSchema._type): Promise<Either<Failure, Savings>> {
    try {
      const response = await this.datasource.createSavings(data);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      console.error("failed to create savings in savings repositoryImpl =>", error);
      return left(new Failure(errorMessage));
    }
  }

  async deleteSavings(savingsId: number): Promise<Either<Failure, GeneralResponse>> {
    try {
      const response = await this.datasource.deleteSavings(savingsId);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      console.error("failed to delete savings in savings repositoryImpl =>", error);
      return left(new Failure(errorMessage));
    }
  }

  async getSavings(page: number, pageSize: number): Promise<Either<Failure, Savings[]>> {
    try {
      const response = await this.datasource.getSavings(page, pageSize);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      console.error("failed to get savings in savings repositoryImpl =>", error);
      return left(new Failure(errorMessage));
    }
  }

  async getSavingsById(savingsId: number): Promise<Either<Failure, Savings>> {
    try {
      const response = await this.datasource.getSavingsById(savingsId);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      console.error("failed to get savings by id in savings repositoryImpl =>", error);
      return left(new Failure(errorMessage));
    }
  }

  async updateSavings(data: typeof SavingsSchema._type, savingsId: number): Promise<Either<Failure, Savings>> {
    try {
      const response = await this.datasource.updateSavings(data, savingsId);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      console.error("failed to update savings in savings repositoryImpl =>", error);
      return left(new Failure(errorMessage));
    }
  }
}