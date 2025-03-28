import { z } from 'zod';

export const accountSchema = z.object({
  name: z.string().min(3, { message: 'Name too short' }).optional(),
  currency: z.object({
    id: z.number(),
    label: z.string(),
    value: z.string()
  }).refine(data => data.id !== undefined, { message: "Currency is required" }),
});

export const accountResetPasswordSchema = z.object({
  old_password: z.string().min(6, { message: 'Password too short' }),
  new_password: z.string().min(6, { message: 'Password too short' }),
  confirmPassword: z.string().min(6, { message: 'Password too short' })
}).superRefine((data, ctx) => {
  if (data.confirmPassword !== data.new_password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    });
  }
});