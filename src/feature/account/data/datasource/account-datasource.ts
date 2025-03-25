import { UserModel } from '@/src/feature/account/data/model/user-model';
import { GeneralResponseModel } from '@/src/shared/data/model/general-response-model';
import { AccountService } from '@/src/core/service/account';
import { Exception } from '@/src/core/error/exception';
import { accountResetPasswordSchema, accountSchema } from '@/src/core/validation/account-validation';
import { CurrencyModel } from '@/src/feature/account/data/model/currency-model';

export interface AccountDatasource {
  getCurrentUser(): Promise<UserModel>;
  updateUser(user: typeof accountSchema._type): Promise<GeneralResponseModel>;
  resetPassword(data: typeof accountResetPasswordSchema._type): Promise<GeneralResponseModel>;
  getCurrencies(): Promise<CurrencyModel[]>;
}

export class AccountDatasourceImpl implements AccountDatasource {
  constructor(private accountService: AccountService) {
  }
  async getCurrentUser(): Promise<UserModel> {
    try {
      const response = await this.accountService.getCurrentUser();
      return UserModel.fromJson(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
  async updateUser(user: typeof accountSchema._type): Promise<GeneralResponseModel> {
    try {
      const response = await this.accountService.updateUser(user);
      return GeneralResponseModel.fromJson(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
  async resetPassword(data: typeof accountResetPasswordSchema._type): Promise<GeneralResponseModel> {
    try {
      const response = await this.accountService.resetPassword(data);
      return GeneralResponseModel.fromJson(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async getCurrencies(): Promise<CurrencyModel[]> {
    try {
      const response = this.accountService.getCurrencies();
      return CurrencyModel.fromJsonList(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
}