import { AuthRepositoryImpl } from '@/src/feature/authentication/data/repository/auth-repository-impl';
import { AuthenticationService } from '@/src/core/service/authentication';
import { AuthDatasourceImpl } from '@/src/feature/authentication/data/datasource/auth-datasource';
import { SignInUseCase } from '@/src/feature/authentication/domain/use-case/use-sign-in';
import { SignUpUseCase } from '@/src/feature/authentication/domain/use-case/use-sign-up';
import { ResetPasswordUseCase } from '@/src/feature/authentication/domain/use-case/use-reset-password';
import { VerifyOtpUseCase } from '@/src/feature/authentication/domain/use-case/use-verify-otp';
import { RequestResetPasswordUseCase } from '@/src/feature/authentication/domain/use-case/use-request-reset-password';
import { GetCurrentUserUseCase } from '@/src/feature/authentication/domain/use-case/use-get-current-user';

// Authentication Dependencies
const authenticationService = new AuthenticationService();
const authenticationDatasource = new AuthDatasourceImpl(authenticationService);
const authRepository = new AuthRepositoryImpl(authenticationDatasource);
export const signInUseCase = new SignInUseCase(authRepository);
export const signUpUseCase = new SignUpUseCase(authRepository);
export const requestResetPasswordUseCase = new RequestResetPasswordUseCase(authRepository);
export const resetPasswordUseCase = new ResetPasswordUseCase(authRepository);
export const verifyOtpUseCase = new VerifyOtpUseCase(authRepository);
export const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);