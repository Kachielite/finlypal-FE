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

  async getTotalSpend(type: string, startDate?: string, endDate?: string): Promise<any> {
    let url = `${this.BASE_URL}${this.TOTAL_SPEND_PATH}?type=${type}`;

    if (startDate && endDate) {
      url += `&start_date=${startDate}&end_date=${endDate}`;
    }
    try {
      const response = await customAxios.get(url);
      return response.data;
    } catch (error: unknown) {
      console.error("Get total spend error", error);
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

  async getTotalSpendByCategory(type: string, startDate: string, endDate: string): Promise<any> {
    try {
      const response = await customAxios.get(`${this.BASE_URL}${this.TOTAL_SPEND_BY_CATEGORY_PATH}?type=${type}&startDate=${startDate}&endDate=${endDate}`, {
      });

      return response.data;
    } catch (error: unknown) {
      console.error("Get total spend by category error", error);
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

  async getTopExpenses(type: string, startDate?: string, endDate?: string): Promise<any> {
    let url = `${this.BASE_URL}${this.TOTAL_SPEND_PATH}?type=${type}`;

    if (startDate && endDate) {
      url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    try {
      const response = await customAxios.get(url);

      return response.data;
    } catch (error: unknown) {
      console.error("Get top expenses error", error);
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

  async getMonthlySpend(type: string, startDate?: string, endDate?: string): Promise<any> {

    let url = `${this.BASE_URL}${this.TOTAL_SPEND_PATH}?type=${type}`;

    if (startDate && endDate) {
      url += `&startDate=${startDate}&endDate=${endDate}`;
    }

    try {
      const response = await customAxios.get(url);

      return response.data;
    } catch (error: unknown) {
      console.error("Get monthly spend error", error);
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

  async getDailySpend(type: string, startDate?: string, endDate?: string): Promise<any> {
    let url = `${this.BASE_URL}${this.TOTAL_SPEND_PATH}?type=${type}`;

    if (startDate && endDate) {
      url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    try {
      const response = await customAxios.get(url);

      return response.data;
    } catch (error: unknown) {
      console.error("Get daily spend error", error);
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