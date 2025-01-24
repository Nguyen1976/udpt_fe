import { configureStore } from '@reduxjs/toolkit';
import userReducer from '~/redux/userSlice';
import noteReducer from '~/redux/noteSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        note: noteReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
