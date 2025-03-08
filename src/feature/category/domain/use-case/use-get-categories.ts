import { UseCase } from '@/src/core/use-case/use-case';
import { Category } from '@/src/feature/category/domain/entity/category';
import { Either } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { CategoryRepository } from '@/src/feature/category/domain/repository/category-repository';

export class GetCategoriesUseCaseParams {
  constructor(
    public page?: number,
    public pageSize?: number
  ) {
  }
}

export class GetCategoriesUseCase extends UseCase<Category[], GetCategoriesUseCaseParams>{
  constructor(private categoryRepository: CategoryRepository) {
    super();
  }
  async execute(params: GetCategoriesUseCaseParams): Promise<Either<Failure, Category[]>> {
    return await this.categoryRepository.getCategories(params.page, params.pageSize);
  }

}