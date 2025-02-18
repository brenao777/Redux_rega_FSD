import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '@/entities/note/redux/noteSlice';
import notebookReducer from '@/entities/notebook/redux/notebookSlice';
import userReducer from '@/entities/user/redux/userSlice';

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    user: userReducer,
    notebooks: notebookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
