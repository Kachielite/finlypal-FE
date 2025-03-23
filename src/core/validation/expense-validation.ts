import { z } from 'zod';


export const GetExpenseSchema = z
  .object({
    startDate: z.string().min(1, { message: 'Start date is required' }),
    endDate: z.string().min(1, { message: 'End date is required' }),
    category:  z.object({ id: z.number(), label: z.string(), value: z.string() }).nullable(),
    type: z.object({ id: z.number(), label: z.string(), value: z.string() }).nullable(),
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


export const CreateExpenseSchema = z
  .object({
    description: z.string().min(1, { message: "Description is required" }),
    amount: z.number().min(1, { message: "Amount is required" }),
    category: z
      .object({
        id: z.number(),
        label: z.string(),
        value: z.string(),
      })
      .refine((data) => data.id !== undefined, { message: "Category is required" }),
    date: z.string().min(1, { message: "Date is required" }),
    type: z
      .object({
        id: z.number(),
        label: z.string(),
        value: z.string(),
      })
      .refine((data) => data.id !== undefined, { message: "Type is required" }),
    isRelatedToBudgetOrSavings: z.boolean().optional(),
    budget: z
      .object({
        id: z.number(),
        label: z.string(),
        value: z.string(),
      })
      .optional()
      .nullable(),
    budgetItem: z
      .object({
        id: z.number(),
        label: z.string(),
        value: z.string(),
      })
      .optional()
      .nullable(),
    savings: z
      .object({
        id: z.number(),
        label: z.string(),
        value: z.string(),
      })
      .optional()
      .nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.isRelatedToBudgetOrSavings) {
      const isIncome = data.type.value === "INCOME";
      const isExpense = data.type.value === "EXPENSE";

      // If type is INCOME, savings is required
      if (isIncome && !data.savings) {
        ctx.addIssue({
          path: ["savings"],
          message: "Savings is required when type is INCOME and related to a savings goal",
          code: z.ZodIssueCode.custom,
        });
      }

      // If type is EXPENSE, budget is required
      if (isExpense && !data.budget) {
        ctx.addIssue({
          path: ["budget"],
          message: "Budget is required when type is EXPENSE and related to a budget",
          code: z.ZodIssueCode.custom,
        });
      }

      // If budget is provided, budgetItem must also be provided
      if (data.budget && !data.budgetItem) {
        ctx.addIssue({
          path: ["budgetItem"],
          message: "Budget item is required when a budget is selected",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });