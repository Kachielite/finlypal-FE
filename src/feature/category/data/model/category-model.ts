import { Category } from '@/src/feature/category/domain/entity/category';

export class CategoryModel extends Category {
  constructor(
    public id: number,
    public name: string,
    public displayName: string,
    public description: string
  ) {
    super(id, name, displayName, description);
  }

  static fromJSON(json: any): CategoryModel {
    return new CategoryModel(json.id, json.name, json.displayName, json.description);
  }

  static fromJSONList(jsonList: any[]): CategoryModel[] {
    return jsonList.map(json => CategoryModel.fromJSON(json));
  }
}