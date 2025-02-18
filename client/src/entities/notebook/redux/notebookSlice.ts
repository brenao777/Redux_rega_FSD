import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { NotebookSliceType } from '../model/types/types';
import { getNotebooks } from './notebookThunk';

const initialState: NotebookSliceType = {
  notebooks: [],
  loading: false,
  error: null,
  notebookId: null,
};

export const notebookSlice = createSlice({
  name: 'notebook',
  initialState,
  reducers: {
    switchId: (state, action: PayloadAction<number>) => {
      state.notebookId = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getNotebooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotebooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error getNotes';
      })
      .addCase(getNotebooks.fulfilled, (state, action) => {
        state.loading = false;
        state.notebooks = action.payload;
      });
  },
});

export const { switchId } = notebookSlice.actions
export default notebookSlice.reducer