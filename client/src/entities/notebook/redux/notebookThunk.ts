import { createAsyncThunk } from '@reduxjs/toolkit';
import notebookService from '../api/notebookService';

export const getNotebooks = createAsyncThunk('notebook/getNotebooks', () =>
  notebookService.getNotebooks(),
);
