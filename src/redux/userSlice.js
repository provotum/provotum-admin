import { createSlice } from '@reduxjs/toolkit';

//a slice is a collection of redux reducer logic and actions for a single feature in the app
export const slice = createSlice({
    name: 'user',
    initialState: {
        address: '',
        name: ''
    },
    //can only mutate the state directly when using the createSlice from the toolkit
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        }
    }
})

export const { setName } = slice.actions


//this function is called a 'selector' and is basically a getter for less code in the part accessing the store
export const getName = state => state.user.name;

export default slice.reducer;