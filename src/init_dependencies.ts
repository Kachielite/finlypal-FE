import { AuthRepositoryImpl } from '@/src/feature/authentication/data/repository/auth-repository-impl';
import { AuthenticationService } from '@/src/core/service/authentication';
import { AuthDatasourceImpl } from '@/src/feature/authentication/data/datasource/auth-datasource';
import { SignInUseCase } from '@/src/feature/authentication/domain/use-case/use-sign-in';
import { SignUpUseCase } from '@/src/feature/authentication/domain/use-case/use-sign-up';
import { ResetPasswordUseCase } from '@/src/feature/authentication/domain/use-case/use-reset-password';
import { VerifyOtpUseCase } from '@/src/feature/authentication/domain/use-case/use-verify-otp';
import { RequestResetPasswordUseCase } from '@/src/feature/authentication/domain/use-case/use-request-reset-password';
import { GetCurrentUserUseCase } from '@/src/feature/authentication/domain/use-case/use-get-current-user';
import { InsightsService } from '@/src/core/service/insights';
import { InsightsDatasourceImpl } from '@/src/feature/insights/data/datasource/insights-datasource';
import { InsightRepositoryImpl } from '@/src/feature/insights/data/repositoryImpl/insight-repositoryImp';
import { GetDailySpendUseCase } from '@/src/feature/insights/domain/use-case/use-get-daily-spend';
import { GetTopExpensesUseCase } from '@/src/feature/insights/domain/use-case/use-get-top-expenses';

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


// Insights Dependencies
const insightsService = new InsightsService();
const insightDatasource = new InsightsDatasourceImpl(insightsService);
const insightsRepository = new InsightRepositoryImpl(insightDatasource);
export const getDailySpendUseCase = new GetDailySpendUseCase(insightsRepository);
export const getMonthlySpendUseCase = new GetDailySpendUseCase(insightsRepository);
export const getTopExpensesUseCase = new GetTopExpensesUseCase(insightsRepository);
export const getTotalSpendUseCase = new GetTopExpensesUseCase(insightsRepository);
export const getTotalSpendByCategoryUseCase = new GetTopExpensesUseCase(insightsRepository);