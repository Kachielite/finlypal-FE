import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export abstract class UseCase<T, P> {
  abstract execute(params: P): Promise<Either<Failure, T>>;
}

export class NoParams{}

export class InsightsUseCaseParams{
  constructor(
    public type: string,
    public startDate?: string,
    public endDate?: string
  ) {
  }
}