import { UserModel } from '@/src/feature/account/data/model/user-model';
import { GeneralResponseModel } from '@/src/shared/data/model/general-response-model';
import { AccountService } from '@/src/core/service/account';
import { Exception } from '@/src/core/error/exception';
import { accountResetPasswordSchema, accountSchema } from '@/src/core/validation/account-validation';
import { CurrencyModel } from '@/src/feature/account/data/model/currency-model';

export interface AccountDatasource {
  getCurrentUser(): Promise<UserModel>;
  updateUser(user: typeof accountSchema._type, userId: number): Promise<UserModel>;
  resetPassword(data: typeof accountResetPasswordSchema._type, userId: number): Promise<GeneralResponseModel>;
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
  async updateUser(user: typeof accountSchema._type, userId: number): Promise<UserModel> {
    try {
      const response = await this.accountService.updateUser(user, userId);
      return UserModel.fromJson(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
  async resetPassword(data: typeof accountResetPasswordSchema._type, userId: number): Promise<GeneralResponseModel> {
    try {
      const response = await this.accountService.resetPassword(data, userId);
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
      const response = await this.accountService.getCurrencies();
      return CurrencyModel.fromJsonList(response);
    } catch (error: unknown) {
      console.error("Get currencies; account datasource =>", error);
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
}