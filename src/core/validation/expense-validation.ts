import { z } from 'zod';


export const GetExpenseSchema = z
  .object({
    startDate: z.string().min(1, { message: 'Start date is required' }),
    endDate: z.string().min(1, { message: 'End date is required' }),
    category: z.string().min(1, { message: 'Category is required' }).nullable(),
    type: z
      .string()
      .nullable()
      .refine(val => val === null || ['INCOME', 'EXPENSE'].includes(val), {
        message: 'Type must be either INCOME or EXPENSE'
      })
  })
  .refine(
    ({ startDate, endDate }) => new Date(startDate) < new Date(endDate),
    {
      message: 'Start date must be before end date',
      path: ['startDate'], // Attach error to startDate
    }
  )
  .refine(
    ({ startDate, endDate }) => new Date(endDate) > new Date(startDate),
    {
      message: 'End date must be after start date',
      path: ['endDate'], // Attach error to endDate
    }
  );


export const CreateExpenseSchema = z.object({
  description: z.string().min(1, { message: 'Description is required' }),
  amount: z.number().min(1, { message: 'Amount is required' }),
  category: z.string().min(1, { message: 'Category is required' }).nullable(),
  date: z.string().min(1, { message: 'Date is required' }),
  type: z
    .string()
    .refine(val => val === 'INCOME' || val === 'EXPENSE', {
      message: 'Type must be either INCOME or EXPENSE'
    }).nullable()
});