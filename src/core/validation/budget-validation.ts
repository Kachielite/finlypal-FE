import { z } from 'zod';

export const budgetSchema =
  z.object({
  budgetName: z.string().min(2, { message: 'Name too short' }),
  icon: z.string().min(1, { message: 'Icon too short' }),
  startDate: z.string().min(1, { message: 'Start date too short' }),
  endDate: z.string().min(1, { message: 'End date too short' }),
  totalBudget: z.number().min(1, { message: 'Amount too short' }),
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