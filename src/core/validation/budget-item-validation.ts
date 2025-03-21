import { z } from 'zod';

export const budgetItemSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  icon: z.string().min(1, { message: 'Icon is required' }),
  allocatedAmount: z.number().min(1, { message: 'Amount is required' }),
});

export const budgetItemExpenseSchema = z.object({
  description: z.string().min(1, { message: 'Description is required' }),
  amount: z.number().min(1, { message: 'Amount is required' }),
  category: z.object({
    id: z.number(),
    label: z.string(),
    value: z.string()
  }).refine(data => data.id !== undefined, { message: "Category is required" }).nullable(),
  date: z.string().min(1, { message: 'Date is required' }),
});