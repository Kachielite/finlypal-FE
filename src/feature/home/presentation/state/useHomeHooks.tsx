import moment from 'moment';
import { useHomeState } from '@/src/feature/home/presentation/state/homeState';
import { useEffect } from 'react';
import { homeBloc } from '@/src/feature/home/presentation/state/homeBloc';
import { HOME_EVENTS } from '@/src/feature/home/presentation/state/homeEvent';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';

export type HomeHooks = {
  isLoading: boolean;
  totalIncome: number;
  totalExpense: number;
  expensesList: Expense[]
}

const useHomeHooks = (): HomeHooks => {
  
  const today = moment();
  const startDate = today.startOf('month').format('YYYY-MM-DD');
  const endDate = today.endOf('month').format('YYYY-MM-DD');

  const isLoading = useHomeState((state) => state.isLoading);
  const totalIncome = useHomeState((state) => state.totalIncome);
  const totalExpense = useHomeState((state) => state.totalExpense);
  const expensesList = useHomeState((state) => state.expensesList);

  useEffect(() => {
    const fetchData = async () => {
      useHomeState.getState().setIsLoading(true);
      try {
        await Promise.all([
          homeBloc.handleHomeEvent(HOME_EVENTS.GET_EXPENSES, { startDate, endDate }),
          homeBloc.handleHomeEvent(HOME_EVENTS.GET_TOTAL_EXPENSE, { type: 'EXPENSE', startDate, endDate }),
          homeBloc.handleHomeEvent(HOME_EVENTS.GET_TOTAL_INCOME, { type: 'INCOME', startDate, endDate })
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        useHomeState.getState().setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return {isLoading, totalIncome, totalExpense, expensesList}
}

export default useHomeHooks;