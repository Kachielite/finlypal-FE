import { SECRET } from '@/src/core/secret/secret';
import customAxios from '@/src/core/utils/customAxios';
import axios from 'axios';
import { accountResetPasswordSchema, accountSchema } from '@/src/core/validation/account-validation';

export class AccountService {
  private BASE_URL  = SECRET.BASE_URL;
  private ACCOUNT_PATH = '/users';

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

  async updateUser(user: typeof accountSchema._type): Promise<any> {
    try {
      const response = await customAxios.put(`${this.BASE_URL}${this.ACCOUNT_PATH}/update-user`, user);
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
        path: `${this.ACCOUNT_PATH}/update-user`,
      });
    }
  }

  async resetPassword(data: typeof accountResetPasswordSchema._type): Promise<any> {
    try {
      const response = await customAxios.put(`${this.BASE_URL}${this.ACCOUNT_PATH}/update-user`, data);
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
        path: `${this.ACCOUNT_PATH}/update-user`,
      });
    }
  }

}