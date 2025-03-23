import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { Savings } from '@/src/feature/savings/domain/entity/savings';
import { SavingsSchema } from '@/src/core/validation/savings-validation';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';

export interface SavingsRepository {
  getSavings(page: number, pageSize: number): Promise<Either<Failure, Savings[]>>;
  getSavingsById(savingsId: number): Promise<Either<Failure, Savings>>;
  createSavings(data: typeof SavingsSchema._type): Promise<Either<Failure, Savings>>;
  updateSavings(data: typeof SavingsSchema._type, savingsId: number): Promise<Either<Failure, Savings>>;
  deleteSavings(savingsId: number): Promise<Either<Failure, GeneralResponse>>;
}