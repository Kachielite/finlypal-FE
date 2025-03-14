import { SECRET } from '@/src/core/secret/secret';
import axios from 'axios';
import customAxios from '@/src/core/utils/customAxios';

export class BudgetService {
  private BASE_URL = SECRET.BASE_URL;
  private BUDGET_PATH = '/budget';

  constructor() {}

  async deleteBudget(budgetId: string): Promise<any> {
    try{
      const response = await customAxios.delete(`${this.BASE_URL}${this.BUDGET_PATH}/${budgetId}`);
      return response.data
    } catch (error: unknown) {
      console.error("Get categories error service", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.BUDGET_PATH,
      });
    }
  }

  async getBudget(budgetId: string): Promise<any> {
    try{
      const response = await customAxios.get(`${this.BASE_URL}${this.BUDGET_PATH}/${budgetId}`);
      return response.data
    } catch (error: unknown) {
      console.error("Get categories error service", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.BUDGET_PATH,
      });
    }
  }

  async getAllBudgets(page?: number, pageSize?: number): Promise<any> {
    try{
      const response = await customAxios.get(`${this.BASE_URL}${this.BUDGET_PATH}?page=${page || 0}&pageSize=${pageSize || 10}`);
      return response.data
    } catch (error: unknown) {
      console.error("Get categories error service", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.BUDGET_PATH,
      });
    }
  }

  async createBudget({budgetName, startDate, endDate, totalBudget}: {budgetName: string, startDate: string, endDate: string, totalBudget: number}): Promise<any> {

    const {budget_name, start_date, end_date, total_budget} = {budget_name: budgetName, start_date: startDate, end_date: endDate, total_budget: totalBudget}

    try{
      const response =  await customAxios.post(`${this.BASE_URL}${this.BUDGET_PATH}`, {budget_name, start_date, end_date, total_budget});
      return response.data
    } catch (error: unknown) {
      console.error("Get categories error service", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.BUDGET_PATH,
      });
    }
  }

  async updateBudget({budgetId, budgetName, startDate, endDate, totalBudget}: {budgetId: number, budgetName: string, startDate: string, endDate: string, totalBudget: number}): Promise<any> {

    const {budget_name, start_date, end_date, total_budget} = {budget_name: budgetName, start_date: startDate, end_date: endDate, total_budget: totalBudget}

    try{
      const response = await customAxios.put(`${this.BASE_URL}${this.BUDGET_PATH}/${budgetId}`, {budget_name, start_date, end_date, total_budget});
      return response.data
    } catch (error: unknown) {
      console.error("Get categories error service", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.BUDGET_PATH,
      });
    }
  }

}