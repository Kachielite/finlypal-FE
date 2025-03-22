import { SECRET } from '@/src/core/secret/secret';
import customAxios from '@/src/core/utils/customAxios';
import axios from 'axios';
import { SavingsSchema } from '@/src/core/validation/savings-validation';

export class SavingsService {
  private BASE_URL = SECRET.BASE_URL;
  private SAVINGS_PATH = '/savings';

  constructor() {
  }

  async getSavings(page: number, pageSize: number): Promise<any> {
    try {
      const response = await customAxios.get(`${this.BASE_URL}${this.SAVINGS_PATH}?page=${page || 0}&pageSize=${pageSize || 40}`);
      return response.data;
    } catch (error: unknown) {
      console.error("Get savings error in savings service => ", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.SAVINGS_PATH,
      });
    }
  }

  async getSavingsById(savingsId: number): Promise<any> {
    try {
      const response = await customAxios.get(`${this.BASE_URL}${this.SAVINGS_PATH}/${savingsId}`);
      return response.data;
    } catch (error: unknown) {
      console.error("Get savings by id error in savings service => ", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.SAVINGS_PATH,
      });
    }
  }

  async createSavings(data: typeof SavingsSchema ): Promise<any> {
    try {
      const response = await customAxios.post(`${this.BASE_URL}${this.SAVINGS_PATH}`, data);
      return response.data;
    } catch (error: unknown) {
      console.error("Create savings error in savings service => ", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.SAVINGS_PATH,
      });
    }
  }

  async updateSavings(data: typeof SavingsSchema, savingsId: number ): Promise<any> {
    try {
      const response = await customAxios.put(`${this.BASE_URL}${this.SAVINGS_PATH}/${savingsId}`, data);
      return response.data;
    } catch (error: unknown) {
      console.error("Update savings error in savings service => ", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.SAVINGS_PATH,
      });
    }
  }

  async deleteSavings(savingsId: number): Promise<any> {
    try {
      const response = await customAxios.delete(`${this.BASE_URL}${this.SAVINGS_PATH}/${savingsId}`);
      return response.data;
    } catch (error: unknown) {
      console.error("Delete savings error in savings service => ", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.SAVINGS_PATH,
      });
    }
  }

}