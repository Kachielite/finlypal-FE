import { Failure } from '@/src/core/error/failure';
import { Category } from '@/src/feature/category/domain/entity/category';
import { Either } from 'fp-ts/Either';

export interface CategoryRepository {
  getCategories(page?: number, pageSize?: number): Promise<Either<Failure, Category[]>>
}