// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import examenReducer from '../features/examens/examenSlice';

export const store = configureStore({
  reducer: {
    examens: examenReducer,
  },
});

// Types pour l'utilisation dans les hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
