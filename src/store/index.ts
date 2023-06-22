import { configureStore } from '@reduxjs/toolkit';
import { weatherSlice } from './weatherSlice';
import { weatherApi } from './service/service';

// const middlewareBuilder = (getDefaultMiddleware: typeof MiddlewareArray) => {
//   // Create an array of additional middleware you want to add
//   const additionalMiddleware = [...];

//   // Return an array combining the default middleware and additional middleware
//   return getDefaultMiddleware().concat(additionalMiddleware);
// };

export const store = configureStore({
  reducer: {
    weather: weatherSlice.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
