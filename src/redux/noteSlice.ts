import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NoteState {
    content: string;
}

const initialState: NoteState = {
    content: '',
};

export const userSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        updateNote: (state, action: PayloadAction<Partial<NoteState>>) => {
            state.content = action.payload.content || '';
        },
        resetNote: () => initialState,
    },
});

export const { updateNote, resetNote } = userSlice.actions;

export default userSlice.reducer;
