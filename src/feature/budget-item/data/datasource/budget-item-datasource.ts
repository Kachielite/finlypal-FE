import { BudgetItemModel } from '@/src/feature/budget-item/data/model/budget-item-model';
import { GeneralResponseModel } from '@/src/shared/data/model/general-response-model';
import { BudgetItemsService } from '@/src/core/service/budget-items';
import { Exception } from '@/src/core/error/exception';

export interface BudgetItemDatasource {
  getBudgetItems(budgetId: number): Promise<BudgetItemModel[]>;
  getBudgetItemById(budgetItemId: string): Promise<BudgetItemModel>;
  createBudgetItem({budgetId, budgetItems}: {budgetId: number, budgetItems: {name: string, icon: string, allocated_amount: number}[]}): Promise<GeneralResponseModel>;
  updateBudgetItem({budgetItemId, budgetItem}: {budgetItemId: number, budgetItem: {name: string, icon: string, allocated_amount: number}}): Promise<BudgetItemModel>;
  deleteBudgetItem(budgetItemId: string): Promise<GeneralResponseModel>;
}

export class BudgetItemDatasourceImpl implements BudgetItemDatasource {
  constructor(private budgetItemService: BudgetItemsService) {}

  async createBudgetItem({ budgetId, budgetItems }: {
    budgetId: number;
    budgetItems: { name: string; icon: string; allocated_amount: number }[]
  }): Promise<GeneralResponseModel> {
    try {
      const response = await this.budgetItemService.createBudgetItem({budgetId, budgetItems});
      return GeneralResponseModel.fromJson(response);
    } catch (error: unknown) {
      console.error("Could not create budget item => budget item datasource", error)
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async deleteBudgetItem(budgetItemId: string): Promise<GeneralResponseModel> {
    try {
      const response = await this.budgetItemService.deleteBudgetItem(budgetItemId);
      return GeneralResponseModel.fromJson(response);
    } catch (error: unknown) {
      console.error("Could not delete budget item => budget item datasource", error)
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async getBudgetItemById(budgetItemId: string): Promise<BudgetItemModel> {
    try {
      const response = await this.budgetItemService.getBudgetItem(budgetItemId);
      return BudgetItemModel.fromJson(response);
    } catch (error: unknown) {
      console.error("Could not get budget item => budget item datasource", error)
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async getBudgetItems(budgetId: number): Promise<BudgetItemModel[]> {
    try {
      const response = await this.budgetItemService.getBudgetItems(budgetId);
      return BudgetItemModel.fromJsonList(response);
    } catch (error: unknown) {
      console.error("Could not get budget items => budget item datasource", error)
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async updateBudgetItem({ budgetItemId, budgetItem }: {
    budgetItemId: number;
    budgetItem: { name: string; icon: string; allocated_amount: number }
  }): Promise<BudgetItemModel> {
    try {
      const response = await this.budgetItemService.updateBudgetItem({budgetItemId, budgetItem});
      return BudgetItemModel.fromJson(response);
    } catch (error: unknown) {
      console.error("Could not update budget item => budget item datasource", error)
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

}