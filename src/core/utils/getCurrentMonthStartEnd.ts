import moment from 'moment';

function getCurrentMonthStartEnd(): {startDate: string, endDate: string} {
  const today = moment();
  const start_date = today.startOf('month').format('YYYY-MM-DD');
  const end_date = today.endOf('month').format('YYYY-MM-DD');
  return {startDate: start_date, endDate: end_date};
}

export default getCurrentMonthStartEnd;