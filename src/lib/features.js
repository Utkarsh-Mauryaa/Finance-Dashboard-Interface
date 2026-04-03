
import { format, subMonths } from 'date-fns';

export const getLast6Months = () => {
  const currentDate = new Date();
  const last6Months = [];

  for (let i = 0; i < 6; i++) {
    // subMonths handles the subtraction logic (0 = current month, 1 = last month, etc.)
    const monthDate = subMonths(currentDate, i);
    
    // 'MMMM' is the token for the full name of the month
    last6Months.unshift(format(monthDate, 'MMMM'));
  }

  return last6Months;
};

// export const modifiedTransactions = (transactions=[]) => {
//   return transactions.map((transaction, index) => {
//     return {
//       id: index + 1,
//       date: 
//     }
//   })

// }