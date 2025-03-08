import { CategoryModel } from '@/src/feature/category/data/model/category-model';
import { CategoryService } from '@/src/core/service/categories';
import { Exception } from '@/src/core/error/exception';

export interface CategoryDatasource {
  getCategories(page?: number, pageSize?: number): Promise<CategoryModel[]>
}

export class CategoryDatasourceImpl implements CategoryDatasource {
  constructor(private categoryService: CategoryService) {
  }

  async getCategories(page?: number, pageSize?: number): Promise<CategoryModel[]> {
    try {
      const response = await this.categoryService.getCategories(page, pageSize);
      return CategoryModel.fromJSONList(response)
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && "message" in error) {
        throw new Exception(error.message as string);
      } else {
        throw new Exception("An unknown error occurred");
      }
    }
  }
}