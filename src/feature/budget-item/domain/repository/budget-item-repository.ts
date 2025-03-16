import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';

export interface BudgetItemRepository{
  createBudgetItem({budgetId, budgetItems}: {budgetId: number, budgetItems: {name: string, icon: string, allocated_amount: number}[]}): Promise<Either<Failure, GeneralResponse>>;
  updateBudgetItem({budgetItemId, budgetItem}: {budgetItemId: number, budgetItem: {name: string, icon: string, allocated_amount: number}}): Promise<Either<Failure, BudgetItem>>;
  deleteBudgetItem(budgetItemId: number): Promise<Either<Failure, GeneralResponse>>;
  getBudgetItemById(budgetItemId: number): Promise<Either<Failure, BudgetItem>>;
  getBudgetItems(budgetId: number): Promise<Either<Failure, BudgetItem[]>>;
}