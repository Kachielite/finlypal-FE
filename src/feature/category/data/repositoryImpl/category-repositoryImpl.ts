import { CategoryRepository } from '@/src/feature/category/domain/repository/category-repository';
import { Either, left, right } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { Category } from '@/src/feature/category/domain/entity/category';
import { CategoryDatasource } from '@/src/feature/category/data/datasource/category-datasource';
import Error from 'es-errors';

export class CategoryRepositoryImpl implements CategoryRepository{
  constructor(private categoryDatasource: CategoryDatasource) {
  }

  async getCategories(page?: number, pageSize?: number): Promise<Either<Failure, Category[]>> {
    try {
      const categories = await this.categoryDatasource.getCategories(page, pageSize);
      return right(categories);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      return left(new Failure(errorMessage));
    }
  }

}