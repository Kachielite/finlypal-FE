import { z } from 'zod';

export const budgetItemSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  icon: z.string().min(1, { message: 'Icon is required' }),
  allocatedAmount: z.number().min(1, { message: 'Amount is required' }),
});