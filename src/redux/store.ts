import { configureStore } from '@reduxjs/toolkit';
import remarquesReducer from '../features/remarques/remarquesSlice';
import examensReducer from '../features/examens/examenSlice';

export const store = configureStore({
  reducer: {
    remarques: remarquesReducer,
    examens: examensReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;