import { BudgetItemsRepository } from '@/src/feature/budget-item/domain/repository/budget-items-repository';
import { Either, left, right } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';
import { BudgetItemsDatasource } from '@/src/feature/budget-item/data/datasource/budget-items-datasource';
import Error from 'es-errors';

export class BudgetItemsRepositoryImp implements BudgetItemsRepository{
  constructor(private budgetDatasource: BudgetItemsDatasource) {
  }

  async createBudgetItem({ budgetId, budgetItems }: {
    budgetId: number;
    budgetItems: { name: string; icon: string; allocated_amount: number }[]
  }): Promise<Either<Failure, GeneralResponse>> {
    try {
      const response = await this.budgetDatasource.createBudgetItem({budgetId, budgetItems});
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while creating budget item => budget item repository";
      return left(new Failure(errorMessage));
    }
  }

  async deleteBudgetItem(budgetItemId: number): Promise<Either<Failure, GeneralResponse>> {
    try {
      const response = await this.budgetDatasource.deleteBudgetItem(budgetItemId);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while deleting budget item => budget item repository";
      return left(new Failure(errorMessage));
    }
  }

  async getBudgetItemById(budgetItemId: number): Promise<Either<Failure, BudgetItem>> {
    try {
      const response = await this.budgetDatasource.getBudgetItemById(budgetItemId);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while getting budget item by id => budget item repository";
      return left(new Failure(errorMessage));
    }
  }

  async updateBudgetItem({ budgetItemId, budgetItem }: {
    budgetItemId: number;
    budgetItem: { name: string; icon: string; allocated_amount: number }
  }): Promise<Either<Failure, BudgetItem>> {
    try {
      const response = await this.budgetDatasource.updateBudgetItem({budgetItemId, budgetItem});
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while updating budget item => budget item repository";
      return left(new Failure(errorMessage));
    }
  }

  async getBudgetItems(budgetId: number): Promise<Either<Failure, BudgetItem[]>> {
    try {
      const response = await this.budgetDatasource.getBudgetItems(budgetId);
      return right(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while getting budget items => budget item repository";
      return left(new Failure(errorMessage));
    }
  }

}