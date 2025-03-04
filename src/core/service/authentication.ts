import { SECRET } from '@/src/core/secret/secret';
import axios from 'axios';
import { AuthModel } from '@/src/feature/authentication/data/model/auth-model';
import { ErrorResponseModel } from '@/src/shared/data/model/error-response-model';
import { GeneralResponseModel } from '@/src/shared/data/model/general-response-model';

export class AuthenticationService {
  private BASE_URL = SECRET.BASE_URL;
  private LOGIN_PATH = '/auth/login';
  private REGISTER_PATH = '/auth/register';
  private REQUEST_RESET_PASSWORD_PATH = '/auth/reset-password-otp';
  private VERIFY_OTP_PATH = '/auth/verify-otp';
  private RESET_PASSWORD_PATH = '/auth/reset-password';

  constructor() {}

  async login(email: string, password: string): Promise<AuthModel | ErrorResponseModel> {
    try {
      const response = await axios.post(`${this.BASE_URL}${this.LOGIN_PATH}`, {
        email,
        password,
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(ErrorResponseModel.fromJson(error.response.data));
      }
      return Promise.reject(new ErrorResponseModel("500", "Unknown error occurred", new Date().toISOString(), this.REGISTER_PATH));
    }
  }

  async register(name: string, email: string, password: string): Promise<AuthModel | ErrorResponseModel> {
    try {
      const response = await axios.post(`${this.BASE_URL}${this.REGISTER_PATH}`, {
        name,
        email,
        password,
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(ErrorResponseModel.fromJson(error.response.data));
      }
      return Promise.reject(new ErrorResponseModel("500", "Unknown error occurred", new Date().toISOString(), this.REGISTER_PATH));
    }
  }

  async requestResetPassword(email: string): Promise<ErrorResponseModel | GeneralResponseModel> {
    try {
      const response = await axios.post(`${this.BASE_URL}${this.REQUEST_RESET_PASSWORD_PATH}`, {
        email,
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(ErrorResponseModel.fromJson(error.response.data));
      }
      return Promise.reject(new ErrorResponseModel("500", "Unknown error occurred", new Date().toISOString(), this.REGISTER_PATH));
    }
  }

  async verifyOtp(email: string, otp: string): Promise<ErrorResponseModel | GeneralResponseModel> {
    try {
      const response = await axios.post(`${this.BASE_URL}${this.VERIFY_OTP_PATH}`, {
        email,
        otp,
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(ErrorResponseModel.fromJson(error.response.data));
      }
      return Promise.reject(new ErrorResponseModel("500", "Unknown error occurred", new Date().toISOString(), this.REGISTER_PATH));
    }
  }

  async resetPassword(email: string, password: string): Promise<ErrorResponseModel | GeneralResponseModel> {
    try {
      const response = await axios.post(`${this.BASE_URL}${this.RESET_PASSWORD_PATH}`, {
        email,
        password,
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(ErrorResponseModel.fromJson(error.response.data));
      }
      return Promise.reject(new ErrorResponseModel("500", "Unknown error occurred", new Date().toISOString(), this.REGISTER_PATH));
    }
  }
}