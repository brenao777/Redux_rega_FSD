import { z } from 'zod';

export const noteObjSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  notebookId: z.number(),
  userId: z.number(),
  tags: z.string(),
});

export const noteAddForm = z.object({
  title: z.string(),
  body: z.string(),
  tags: z.string(),
  notebookId: z.number(),
});

export const noteArrSchema = z.array(noteObjSchema);

export type noteObjType = z.infer<typeof noteObjSchema>;
export type noteArrType = z.infer<typeof noteArrSchema>;
export type addNoteType = z.infer<typeof noteAddForm>;

export type editNoteType = {
  editedNote: addNoteType;
  id: number;
};
