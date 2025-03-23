import { BudgetStatus } from '@/src/feature/budget/domain/entity/budget';

const getBudgetStatus = (status: string): BudgetStatus | null => {
  const statusMap: Record<string, BudgetStatus> = {
    PLANNED: BudgetStatus.PLANNED,
    IN_PROGRESS: BudgetStatus.IN_PROGRESS,
    COMPLETED: BudgetStatus.COMPLETED,
    EXCEEDED: BudgetStatus.EXCEEDED,
    EXPIRED: BudgetStatus.EXPIRED,
    AT_RISK: BudgetStatus.AT_RISK,
    UNDERUTILIZED: BudgetStatus.UNDERUTILIZED,
  };

  return statusMap[status] || null;
};

export default getBudgetStatus;