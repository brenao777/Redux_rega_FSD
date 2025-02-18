import type { z } from 'zod';
import type { noteFormSchema, noteSchema } from '../shema/shema';

export type NoteType = z.infer<typeof noteSchema>;
export type NoteFormType = z.infer<typeof noteFormSchema>;

export type NoteSliceType = {
  notes: NoteType[];
  error: string | null;
  loading: boolean;
  selectedNote: NoteType | null,
};
