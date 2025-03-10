import { z } from 'zod';

export const insightsValidation = z.object({
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().min(1, { message: 'End date is required' }),
  type: z.object({
    id: z.number(),
    label: z.string(),
    value: z.string()
  }).refine(data => data.id !== undefined, { message: "Type is required" }),
})