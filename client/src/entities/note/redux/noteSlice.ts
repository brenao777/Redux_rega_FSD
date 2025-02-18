import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { NoteSliceType, NoteType } from '../model/types/types';
import { addNote, deleteNote, editNote, searchNotes } from './noteThunk';

const initialState: NoteSliceType = {
  notes: [],
  loading: false,
  error: null,
  selectedNote: null,
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<NoteType | null>) => {
      state.selectedNote = action.payload;
    },
  },
  extraReducers(builder) {
    // builder
    //   .addCase(getNotes.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getNotes.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message ?? 'Error getNotes';
    //   })
    //   .addCase(getNotes.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.notes = action.payload;
    //   });

    builder
      .addCase(addNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error addNote';
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.notes.unshift(action.payload);
      });

    builder
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error addNote';
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      });

    builder
      .addCase(editNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error addNote';
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.notes = state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note,
        );
      });

    builder.addCase(searchNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
  },
});

export const { setSelected } = noteSlice.actions;

export default noteSlice.reducer;
