import { SavingsModal } from '@/src/feature/savings/data/model/savings-modal';
import { GeneralResponseModel } from '@/src/shared/data/model/general-response-model';
import { SavingsService } from '@/src/core/service/savings';
import { Exception } from '@/src/core/error/exception';
import { SavingsSchema } from '@/src/core/validation/savings-validation';

export interface SavingsDatasource {
  getSavings(page: number, pageSize: number): Promise<SavingsModal[]>
  getSavingsById(savingsId: number): Promise<SavingsModal>
  createSavings(data: typeof SavingsSchema._type): Promise<SavingsModal>
  updateSavings(data: typeof SavingsSchema._type, savingsId: number): Promise<SavingsModal>
  deleteSavings(savingsId: number): Promise<GeneralResponseModel>
}

export class SavingsDatasourceImpl implements SavingsDatasource {
  constructor(private savingsService: SavingsService) {
  }

  async createSavings(data: typeof SavingsSchema._type): Promise<SavingsModal> {
    try {
      const response = await this.savingsService.createSavings(SavingsModal.toJson(data));
      return SavingsModal.fromJson(response);
    } catch (error: unknown) {
      console.error("failed to create savings in savings datasource =>", error);
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async deleteSavings(savingsId: number): Promise<GeneralResponseModel> {
    try {
      const response = await this.savingsService.deleteSavings(savingsId);
      return GeneralResponseModel.fromJson(response);
    } catch (error: unknown) {
      console.error("failed to delete savings in savings datasource =>", error);
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async getSavings(page: number, pageSize: number): Promise<SavingsModal[]> {
    try {
      const response = await this.savingsService.getSavings(page, pageSize);
      return SavingsModal.fromJsonList(response);
    } catch (error: unknown) {
      console.error("failed to get savings in savings datasource =>", error);
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async getSavingsById(savingsId: number): Promise<SavingsModal> {
    try {
      const response = await this.savingsService.getSavingsById(savingsId);
      return SavingsModal.fromJson(response);
    } catch (error: unknown) {
      console.error("failed to get savings by id in savings datasource =>", error);
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }

  async updateSavings(data: typeof SavingsSchema._type, savingsId: number): Promise<SavingsModal> {
    try {
      const response = await this.savingsService.updateSavings(SavingsModal.toJson(data), savingsId);
      return SavingsModal.fromJson(response);
    } catch (error: unknown) {
      console.error("failed to update savings in savings datasource =>", error);
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
}