import { z } from 'zod';

export const notebookSchema = z.object({
  id: z.number(),
  title: z.string(),
  userId: z.number(),
});

export const notebookFormSchema = z.object({
  title: z.string(),
  userId: z.number(),
});
