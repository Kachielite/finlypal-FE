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
import { ExpensesService } from '@/src/core/service/expenses';
import { ExpenseDatasourceImpl } from '@/src/feature/expenses/data/datasource/expense-datasource';
import { ExpenseRepositoryImpl } from '@/src/feature/expenses/data/repositoryImpl/expense-repositoryImpl';
import { CreateExpenseUseCase } from '@/src/feature/expenses/domain/use-case/use-create-expense';
import { DeleteExpenseUseCase } from '@/src/feature/expenses/domain/use-case/use-delete-expense';
import { GetAllExpenseUseCase } from '@/src/feature/expenses/domain/use-case/use-get-all-expense';
import { GetExpenseByIdUseCase } from '@/src/feature/expenses/domain/use-case/use-get-expense-by-id';
import { UpdateExpenseUseCase } from '@/src/feature/expenses/domain/use-case/use-update-expense';
import { GetTotalSpendUseCase } from '@/src/feature/insights/domain/use-case/use-get-total-spend';

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
export const getTotalSpendUseCase = new GetTotalSpendUseCase(insightsRepository);
export const getTotalSpendByCategoryUseCase = new GetTopExpensesUseCase(insightsRepository);


// Expense Dependencies
const expensesService = new ExpensesService();
const expenseDatasource = new ExpenseDatasourceImpl(expensesService);
const expenseRepository = new ExpenseRepositoryImpl(expenseDatasource);
export const createExpenseUseCase = new CreateExpenseUseCase(expenseRepository);
export const deleteExpenseUseCase = new DeleteExpenseUseCase(expenseRepository);
export const getAllExpenseUseCase = new GetAllExpenseUseCase(expenseRepository);
export const getExpenseByIdUseCase = new GetExpenseByIdUseCase(expenseRepository);
export const updateExpenseUseCase = new UpdateExpenseUseCase(expenseRepository);