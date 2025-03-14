import { useInsightsState } from '@/src/feature/insights/presentation/state/insightsState';
import { useEffect } from 'react';
import { insightsBloc } from '@/src/feature/insights/presentation/state/insightsBloc';
import { INSIGHTS_EVENT } from '@/src/feature/insights/presentation/state/insightsEvent';
import { showToast } from '@/src/shared/presentation/components/toastProvider';
import { Failure } from '@/src/core/error/failure';
import { useForm } from 'react-hook-form';
import { insightsValidation } from '@/src/core/validation/insights-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';


export interface UseInsights {
  watch: (any: string) => any;
  setValue: any;
  handleSubmit: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: Record<string, any>;
  resetInsightsFilterForm: () => void,
  fetchInsightsWithFilterData: () => void;
}

const useInsights = (modalizeRef: any):UseInsights => {

  const {setValue, handleSubmit, watch, formState: { errors }, reset} = useForm({
    resolver: zodResolver(insightsValidation),
    defaultValues: {
      startDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD')
    }
  })

  const resetInsightsFilterForm = () => {
    reset({
      startDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD')
    })
  }

  const fetchInsightsWithFilterData = async () => {
    const data = {
      startDate: watch('startDate'),
      endDate: watch('endDate')
    }
    try {
      await Promise.all([
        insightsBloc.handleInsightsEvent(INSIGHTS_EVENT.GET_TOTAL_INCOME, { type: 'INCOME', startDate: watch('startDate'), endDate: watch('endDate') }),
        insightsBloc.handleInsightsEvent(INSIGHTS_EVENT.GET_TOTAL_EXPENSE, { type: 'EXPENSE', startDate: watch('startDate'), endDate: watch('endDate') }),
        insightsBloc.handleInsightsEvent(INSIGHTS_EVENT.GET_MONTHLY_SPENDING, data),
        insightsBloc.handleInsightsEvent(INSIGHTS_EVENT.GET_TOTAL_SPEND_BY_CATEGORY, data),
        insightsBloc.handleInsightsEvent(INSIGHTS_EVENT.GET_TOP_EXPENSES, data),
      ]);
    } catch (e: unknown) {
      const errorMessage = e instanceof Failure ? e.message : "An unknown error occurred";
      console.error("Error fetching insights", e)
      showToast('error', 'Error', errorMessage)
    } finally {
      useInsightsState.getState().setIsLoading(false);
      modalizeRef.current?.close();
    }
  }

  useEffect(() => {
    (
      async () => {
        await fetchInsightsWithFilterData();
      }
    )()
  }, []);

  const { setStartDate, setEndDate } = useInsightsState.getState();

  useEffect(() => {
    setStartDate(watch("startDate"));
    setEndDate(watch("endDate"));
  }, [watch("startDate"), watch("endDate")]);


  return {watch, setValue, handleSubmit, errors, resetInsightsFilterForm, fetchInsightsWithFilterData}
}

export default useInsights;