import { SECRET } from '@/src/core/secret/secret';
import customAxios from '@/src/core/utils/customAxios';
import axios from 'axios';
import { accountResetPasswordSchema, accountSchema } from '@/src/core/validation/account-validation';

export class AccountService {
  private BASE_URL  = SECRET.BASE_URL;
  private ACCOUNT_PATH = '/users';
  private CURRENCY_PATH = '/currencies';

  constructor() {
  }

  async getCurrentUser(): Promise<any> {
    try {
      const response = await customAxios.get(`${this.BASE_URL}${this.ACCOUNT_PATH}/user-details`, {
      });
      return response.data;
    } catch (error: unknown) {
      console.error("Get current user error", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: `${this.ACCOUNT_PATH}/user-details`,
      });
    }
  }

  async updateUser(user: typeof accountSchema._type, userId: number): Promise<any> {
    try {
      const response = await customAxios.put(`${this.BASE_URL}${this.ACCOUNT_PATH}/${userId}`, {name: user?.name, currency_id: user?.currency?.id});
      return response.data;
    } catch (error: unknown) {
      console.error("Get current user error", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: `${this.ACCOUNT_PATH}/${userId}`,
      });
    }
  }

  async resetPassword(data: typeof accountResetPasswordSchema._type, userId: number): Promise<any> {
    try {
      const response = await customAxios.put(`${this.BASE_URL}${this.ACCOUNT_PATH}/${userId}`, data);
      return response.data;
    } catch (error: unknown) {
      console.error("Get current user error", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: `${this.ACCOUNT_PATH}/${userId}`,
      });
    }
  }

  async getCurrencies(): Promise<any> {
    try {
      const response = await axios.get(`${this.BASE_URL}${this.CURRENCY_PATH}`);
      return response.data;
    } catch (error: unknown) {
      console.error("Get current user error", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: `${this.CURRENCY_PATH}`,
      });
    }
  }

}