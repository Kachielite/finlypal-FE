import { Savings, SavingsStatus } from '@/src/feature/savings/domain/entity/savings';
import { SavingsSchema } from '@/src/core/validation/savings-validation';

export class SavingsModal extends Savings {
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
    super(id, icon, status, statusTooltip, expenses, goalName, targetAmount, savedAmount, startDate, endDate, createdAt);
  }

  static fromJsonList(jsonList: any[]): SavingsModal[] {
    return jsonList?.map(SavingsModal.fromJson);
  }

  static fromJson(json: any): SavingsModal {
    return new SavingsModal(
      json.id,
      json.icon,
      json.status,
      json.status_tooltip,
      json.expenses,
      json.goal_name,
      json.target_amount,
      json.saved_amount,
      json.start_date,
      json.end_date,
      json.created_at
    );
  }

  static toJson(savings: typeof SavingsSchema._type): any {
    return {
      icon: savings.icon,
      goal_name: savings.goalName,
      target_amount: savings.targetAmount,
      start_date: savings.startDate,
      end_date: savings.endDate,
    }
  }
}