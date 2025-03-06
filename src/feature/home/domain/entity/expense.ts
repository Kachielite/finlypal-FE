export class Expense{
  constructor(
    public id: string,
    public amount: number,
    public description: string,
    public date: Date,
    public category: string,
    public categoryId: number
  ) {
  }
}