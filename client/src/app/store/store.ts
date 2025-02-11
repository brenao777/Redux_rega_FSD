import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../entities/user/model/userSlice';
import noteReducer from '../../entities/note/model/noteSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    note: noteReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
