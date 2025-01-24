import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
}

const initialState: UserState = {
    id: '',
    name: '',
    email: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
            Object.assign(state, action.payload);
        },
        resetUser: () => initialState,
    },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
