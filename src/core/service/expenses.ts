import { SECRET } from '@/src/core/secret/secret';
import customAxios from '@/src/core/utils/customAxios';
import axios from 'axios';

export class ExpensesService {
  private BASE_URL = SECRET.BASE_URL;
  private EXPENSES_PATH = '/expenses';

  constructor() {
  }

  async createExpense(amount: number, date: string, description: string, type: string, categoryId: number, budgetItemId?: number, savingsID?: number): Promise<any> {
    try {
      const response = await customAxios.post(`${this.BASE_URL}${this.EXPENSES_PATH}`, {
        amount,
        date,
        description,
        type,
        category_id: categoryId,
        budget_item_id: budgetItemId,
        savings_id: savingsID
      });
      return response.data;
    } catch (error: unknown) {
      console.error("Create Expense error", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.EXPENSES_PATH,
      });
    }
  }

  async updateExpense(id: number, amount?: number, date?: string, description?: string, type?: string, categoryId?: number, budgetItemId?: number, savingsID?: number): Promise<any> {
    const expense: {id: number, amount?: number, date?: string, description?: string, type?: string, category_id?: number, budget_item_id?: number, savings_id?: number} = {id};

    if(amount){
      expense.amount = amount;
    }

    if(date){
      expense.date = date;
    }

    if(description){
      expense.description = description;
    }

    if(type){
      expense.type = type;
    }

    if(categoryId){
      expense.category_id = categoryId;
    }

    if(budgetItemId){
      expense.budget_item_id = budgetItemId;
    }

    if(savingsID){
      expense.savings_id = savingsID;
    }

    try {
      const response = await customAxios.put(`${this.BASE_URL}${this.EXPENSES_PATH}/${id}`, expense);
      return response.data;
    } catch (error: unknown) {
      console.error("Update Expense error", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.EXPENSES_PATH,
      });
    }
  }

  async getExpense(startDate: string, endDate: string, categoryId?: number, type?: string, page?: number, pageSize?: number){
    let url = `${this.BASE_URL}${this.EXPENSES_PATH}?start_date=${startDate}&end_date=${endDate}&page=${page || 0}&pageSize=${pageSize || 50}`

    if(categoryId){
      url += `&category_id=${categoryId}`
    }

    if(type){
      url +=`&expenseType=${type}`
    }

    try{
      const response = await customAxios.get(url);
      return response.data.content
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.EXPENSES_PATH,
      });
    }
  }

  async getExpenseById(id: number){
    try{

      const response = await customAxios.get(`${this.BASE_URL}${this.EXPENSES_PATH}/${id}`);
      return response.data
    } catch (error: unknown) {
      console.error("Get Expense error", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.EXPENSES_PATH,
      });
    }
  }

  async deleteExpenseById(id: number){
    try{
      const response = await customAxios.delete(`${this.BASE_URL}${this.EXPENSES_PATH}/${id}`);
      return response.data
    } catch (error: unknown) {
      console.error("Delete Expense error", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.EXPENSES_PATH,
      });
    }
  }



}