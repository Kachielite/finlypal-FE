import { SECRET } from '@/src/core/secret/secret';
import customAxios from '@/src/core/utils/customAxios';
import axios from 'axios';

export class BudgetItemsService {
  private BASE_URL = SECRET.BASE_URL;
  private BUDGET_PATH = '/budget-item/';

  async getBudgetItems(budgetId: number): Promise<any> {
    try{
      const response = await customAxios.get(`${this.BASE_URL}${this.BUDGET_PATH}${budgetId}/items`);
      return response.data
    } catch (error: unknown) {
      console.error("Error getting budget items => budget items service", error);
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

  async getBudgetItem( budgetItemId: string): Promise<any> {
    try{
      const response = await customAxios.get(`${this.BASE_URL}${this.BUDGET_PATH}${budgetItemId}`);
      return response.data
    } catch (error: unknown) {
      console.error("Error getting budget item by id => budget items service", error);
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

  async createBudgetItem({budgetId, budgetItems}: {budgetId: number, budgetItems: {name: string, icon: string, allocated_amount: number}[]}): Promise<any> {
    try{
      const response = await customAxios.post(`${this.BASE_URL}${this.BUDGET_PATH}${budgetId}/items`, budgetItems);
      return response.data
    } catch (error: unknown) {
      console.error("Error creating budget item => budget items service", error);
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

  async updateBudgetItem({budgetItemId, budgetItem}: {budgetItemId: number, budgetItem: {name: string, icon: string, allocated_amount: number}}): Promise<any> {
    try{
      const response = await customAxios.put(`${this.BASE_URL}${this.BUDGET_PATH}${budgetItemId}`, budgetItem);
      return response.data
    } catch (error: unknown) {
      console.error("Error updating budget item => budget items service", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.BUDGET_PATH,
      })
  }}

  async deleteBudgetItem(budgetItemId: string): Promise<any> {
    try{
      const response = await customAxios.delete(`${this.BASE_URL}${this.BUDGET_PATH}${budgetItemId}`);
      return response.data
    } catch (error: unknown) {
      console.error("Error deleting budget item => budget items service", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.BUDGET_PATH,
      });
    }}
}