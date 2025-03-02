import { AuthModel } from '@/src/feature/authentication/data/model/auth-model';
import { GeneralResponseModel } from '@/src/shared/data/model/general-response-model';
import { AuthenticationService } from '@/src/core/service/authentication';
import { ErrorResponseModel } from '@/src/shared/data/model/error-response-model';
import { Exception } from '@/src/core/error/exception';

export interface AuthDatasource {
  signIn(email: string, password: string): Promise<AuthModel>;
  signUp(name: string, email: string, password: string): Promise<AuthModel>;
  requestResetPassword(email: string): Promise<GeneralResponseModel>;
  otp(email: string, otp: string): Promise<GeneralResponseModel>;
  resetPassword(email: string, password: string): Promise<GeneralResponseModel>;
}

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(private authenticationService: AuthenticationService) {
  }

  async signIn(email: string, password: string): Promise<AuthModel> {
    try {
      const response = await this.authenticationService.login(email, password);
      return AuthModel.fromJson(response);
    } catch (error: unknown){
      if(error instanceof ErrorResponseModel){
        throw new Exception(error.message);
      } else {
        throw new Exception('An unknown error occurred');
      }
    }
  }

  async signUp(name: string, email: string, password: string): Promise<AuthModel> {
    try {
      const response = await this.authenticationService.register(name, email, password);
      return AuthModel.fromJson(response);
    } catch (error: unknown){
      if(error instanceof ErrorResponseModel){
        throw new Exception(error.message);
      } else {
        throw new Exception('An unknown error occurred');
      }
    }
  }

  async requestResetPassword(email: string): Promise<GeneralResponseModel> {
    try {
      const response = await this.authenticationService.requestResetPassword(email);
      return GeneralResponseModel.fromJson(response);
    } catch (error: unknown){
      if(error instanceof ErrorResponseModel){
        throw new Exception(error.message);
      } else {
        throw new Exception('An unknown error occurred');
      }
    }
  }

  async otp(email: string, otp: string): Promise<GeneralResponseModel> {
    try {
      const response = await this.authenticationService.verifyOtp(email, otp);
      return GeneralResponseModel.fromJson(response);
    } catch (error: unknown){
      if(error instanceof ErrorResponseModel){
        throw new Exception(error.message);
      } else {
        throw new Exception('An unknown error occurred');
      }
    }
  }

  async resetPassword(email: string, password: string): Promise<GeneralResponseModel> {
    try {
      const response = await this.authenticationService.resetPassword(email, password);
      return GeneralResponseModel.fromJson(response);
    } catch (error: unknown){
      if(error instanceof ErrorResponseModel){
        throw new Exception(error.message);
      } else {
        throw new Exception('An unknown error occurred');
      }
    }
  }
}