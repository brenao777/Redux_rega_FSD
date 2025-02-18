import { noteFormSchema } from '../model/shema/shema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import noteService from '../api/noteService';

// export const getNotes = createAsyncThunk('note/getNotes', () => noteService.getNotes());

export const searchNotes = createAsyncThunk('note/searchNotes', (data: string) =>
  noteService.search(data),
);

export const addNote = createAsyncThunk('note/addNote', async (formData: FormData) => {
  const data = noteFormSchema.parse(Object.fromEntries(formData));
  return noteService.addNotes(data);
});

export const deleteNote = createAsyncThunk(
  'note/deleteNote',
  async (id: number) => await noteService.deleteNote(id),
);

export const editNote = createAsyncThunk(
  'note/editNote',
  async ({ id, formData }: { id: number; formData: FormData }) => {
    const data = noteFormSchema.parse(Object.fromEntries(formData));
    return noteService.editNote(id, data);
  },
);
