import { SECRET } from '@/src/core/secret/secret';
import axios from 'axios';
import customAxios from '@/src/core/utils/customAxios';

export class CategoryService {
  private BASE_URL = SECRET.BASE_URL;
  private CATEGORIES_PATH = '/categories';

  constructor() {
  }

  async getCategories(page?: number, pageSize?: number): Promise<any> {
    const url = `${this.BASE_URL}${this.CATEGORIES_PATH}?page=${page || 0}&pageSize=${pageSize || 10}`

    try {
      const response = await customAxios.get(url);
      return response.data.content;
    } catch (error: unknown) {
      console.error("Get categories error service", error);
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.CATEGORIES_PATH,
      });
    }
  }
}