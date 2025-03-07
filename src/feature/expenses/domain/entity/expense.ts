export class Expense {
  constructor(
    public id: number,
    public description: string,
    public amount: number,
    public date: string,
    public type: string,
    public categoryId: number
  ) {
  }
}
