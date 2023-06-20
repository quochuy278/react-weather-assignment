import { configureStore } from '@reduxjs/toolkit';
import { weatherSlice } from './weatherSlice';
import { weatherApi } from './service/service';

export const store = configureStore({
  reducer: {
    weather: weatherSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: true }).concat(
      weatherApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
