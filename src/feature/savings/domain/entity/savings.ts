export enum SavingsStatus {
  ON_TRACK = 'On track',
  ACHIEVED = 'Achieved',
  FAILED = 'Failed'
}


export class Savings {
  constructor(
    public id: number,
    public icon: string,
    public status: SavingsStatus,
    public statusTooltip: string,
    public expenses: any[],
    public goalName: string,
    public targetAmount: number,
    public savedAmount: number,
    public startDate: string,
    public endDate: string,
    public createdAt: string
  ) {
  }
}