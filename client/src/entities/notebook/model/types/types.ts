import type { z } from 'zod';
import type { notebookFormSchema, notebookSchema } from '../schema/schema';

export type NotebookType = z.infer<typeof notebookSchema>;
export type NotebookFormType = z.infer<typeof notebookFormSchema>;

export type NotebookSliceType = {
  notebooks: NotebookType[];
  loading: boolean;
  error: string | null;
  notebookId: number | null;
};
