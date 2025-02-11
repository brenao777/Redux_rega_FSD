import { createSlice } from '@reduxjs/toolkit';
import { addNote, delNote, editNote, fetchNote } from '../lib/noteThunk';
import type { noteArrType } from '../types/types';

type NoteState = {
  notes: noteArrType;
  loading: boolean;
  error: null | string;
};

const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchNote.fulfilled, (state, action) => {
        state.loading = true;
        state.notes = action.payload;
      })
      .addCase(delNote.fulfilled, (state, { payload }) => {
        state.notes = state.notes.filter((n) => n.id !== payload);
      })
      .addCase(addNote.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.notes.unshift(payload);
      })
      .addCase(editNote.fulfilled, (state, { payload }) => {
        state.notes = state.notes.map((el) => (el.id === payload.id ? payload : el));
      });
  },
});

export default noteSlice.reducer;
