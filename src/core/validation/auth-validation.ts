import * as z from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(3, { message: 'Name too short' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password too short' }),
  acceptTerms: z.boolean().refine((value) => value, { message: 'You must accept the terms and conditions' }),
});

export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password too short' }),
});

export const requestResetPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
});

export const verifyOtpSchema = z.object({
  otp: z.string().min(4, { message: 'OTP too short' }),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: 'Password too short' }),
  confirmPassword: z.string().min(6, { message: 'Password too short' })
}).superRefine((data, ctx) => {
  if (data.confirmPassword !== data.password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirmPassword'],
      message: "Passwords don't match",
    });
  }
});