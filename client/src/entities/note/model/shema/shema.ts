import { z } from 'zod';

export const noteSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  notebookId: z.number(),
  userId: z.number(),
  tags: z.string(),
});

export const noteFormSchema = z.object({
  title: z.string(),
  body: z.string(),
  notebookId: z.string(),
  tags: z.string(),
});

