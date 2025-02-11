import { createAsyncThunk } from '@reduxjs/toolkit';
import type { addNoteType, editNoteType } from '../types/types';
import { noteArrSchema, noteObjSchema } from '../types/types';
import axiosInstance from '../../../shared/api/axiosInstance';

export const fetchNote = createAsyncThunk('note/fetchNote', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get('/notes');
    return noteArrSchema.parse(data);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
  }
});

export const delNote = createAsyncThunk('note/delNote', async (id: number, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/notes/${String(id)}`);
    return id;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
  }
});

export const addNote = createAsyncThunk(
  'note/addNote',
  async (formData: addNoteType, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/notes', formData);
      return noteObjSchema.parse(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);

export const editNote = createAsyncThunk(
  'note/editNote',
  async ({ editedNote, id }: editNoteType, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/notes/${String(id)}`, editedNote);
      return noteObjSchema.parse(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);
