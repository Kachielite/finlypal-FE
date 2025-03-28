import { NoParams, UseCase } from '@/src/core/use-case/use-case';
import { Currency } from '@/src/feature/account/domain/entity/currency';
import { AccountRepository } from '@/src/feature/account/domain/repository/account-repository';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';

export class GetCurrenciesUseCase extends UseCase<Currency[], NoParams>{
  constructor(private accountRepository: AccountRepository) {
    super();
  }

  async execute(params: NoParams): Promise<Either<Failure, Currency[]>> {
    return await this.accountRepository.getCurrencies();
  }
}