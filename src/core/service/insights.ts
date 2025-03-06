import { SECRET } from '@/src/core/secret/secret';
import customAxios from '@/src/core/utils/customAxios';
import axios from 'axios';

export class InsightsService {
  private BASE_URL = SECRET.BASE_URL;
  private TOTAL_SPEND_PATH = '/insights/total-spend';
  private TOTAL_SPEND_BY_CATEGORY_PATH = '/insights/total-spend-by-category';
  private TOP_EXPENSES_PATH = '/insights/top-expenses';
  private MONTHLY_SPEND_PATH = '/insights/monthly-spend';
  private DAILY_SPEND_PATH = '/insights/daily-spend';

  constructor() {}

  async getTotalSpend(): Promise<any> {
    try {
      const response = await customAxios.get(`${this.BASE_URL}${this.TOTAL_SPEND_PATH}`, {
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.TOTAL_SPEND_PATH,
      });
    }
  }

  async getTotalSpendByCategory(): Promise<any> {
    try {
      const response = await customAxios.get(`${this.BASE_URL}${this.TOTAL_SPEND_BY_CATEGORY_PATH}`, {
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.TOTAL_SPEND_BY_CATEGORY_PATH,
      });
    }
  }

  async getTopExpenses(): Promise<any> {
    try {
      const response = await customAxios.get(`${this.BASE_URL}${this.TOP_EXPENSES_PATH}`, {
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.TOP_EXPENSES_PATH,
      });
    }
  }

  async getMonthlySpend(): Promise<any> {
    try {
      const response = await customAxios.get(`${this.BASE_URL}${this.MONTHLY_SPEND_PATH}`, {
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.MONTHLY_SPEND_PATH,
      });
    }
  }

  async getDailySpend(): Promise<any> {
    try {
      const response = await customAxios.get(`${this.BASE_URL}${this.DAILY_SPEND_PATH}`, {
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.DAILY_SPEND_PATH,
      });
    }
  }
}