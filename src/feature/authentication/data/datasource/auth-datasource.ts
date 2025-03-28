import { AuthModel } from '@/src/feature/authentication/data/model/auth-model';
import { GeneralResponseModel } from '@/src/shared/data/model/general-response-model';
import { AuthenticationService } from '@/src/core/service/authentication';
import { Exception } from '@/src/core/error/exception';

export interface AuthDatasource {
  signIn(email: string, password: string): Promise<AuthModel>;
  signUp(name: string, email: string, password: string): Promise<AuthModel>;
  requestResetPassword(email: string): Promise<GeneralResponseModel>;
  verifyOtp(email: string, otp: string): Promise<GeneralResponseModel>;
  resetPassword(email: string, newPassword: string, token: string): Promise<GeneralResponseModel>;
}

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(private authenticationService: AuthenticationService) {
  }

  async signIn(email: string, password: string): Promise<AuthModel> {
    try {
      const response = await this.authenticationService.login(email, password);
      return AuthModel.fromJson(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async signUp(name: string, email: string, password: string): Promise<AuthModel> {
    try {
      const response = await this.authenticationService.register(name, email, password);
      return AuthModel.fromJson(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async requestResetPassword(email: string): Promise<GeneralResponseModel> {
    try {
      const response = await this.authenticationService.requestResetPassword(email);
      return GeneralResponseModel.fromJson(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async verifyOtp(email: string, otp: string): Promise<GeneralResponseModel> {
    try {
      const response = await this.authenticationService.verifyOtp(email, otp);
      return GeneralResponseModel.fromJson(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async resetPassword(email: string, newPassword: string, token: string): Promise<GeneralResponseModel> {
    try {
      const response = await this.authenticationService.resetPassword(email, newPassword, token);
      return GeneralResponseModel.fromJson(response);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
}