import { z } from 'zod';

export const accountSchema = z.object({
  name: z.string().min(3, { message: 'Name too short' }).optional(),
  currencyId: z.number().min(1, { message: 'Currency is required' }).optional(),
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