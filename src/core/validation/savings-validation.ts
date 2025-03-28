import { z } from 'zod';

export const SavingsSchema = z.object({
  icon: z.string().min(1, { message: 'Icon is required' }),
  goalName: z.string().min(1, { message: 'Icon is required' }),
  targetAmount: z.number().min(1, { message: 'Target amount is required' }),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().min(1, { message: 'End date is required' }),
}).refine(
  ({ startDate, endDate }) => new Date(startDate) < new Date(endDate),
  {
    message: 'Start date must be before end date',
    path: ['startDate'], // Attach error to startDate
  })
  .refine(
    ({ startDate, endDate }) => new Date(endDate) > new Date(startDate),
    {
      message: 'End date must be after start date',
      path: ['endDate'], // Attach error to endDate
    }
  );

export const SavingsExpenseSchema = z.object({
  description: z.string().min(1, { message: 'Description is required' }),
  amount: z.number().min(1, { message: 'Amount is required' }),
  category: z.object({
    id: z.number(),
    label: z.string(),
    value: z.string()
  }).refine(data => data.id !== undefined, { message: "Category is required" }),
  date: z.string().min(1, { message: 'Date is required' }),
});