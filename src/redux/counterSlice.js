import { createSlice } from '@reduxjs/toolkit';

//a slice is a collection of redux reducer logic and actions for a single feature in the app
export const slice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    //can only mutate the state directly when using the createSlice from the toolkit
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        }
    }
})

export const { increment, decrement, incrementByAmount } = slice.actions

//this function is called a 'thunk' and is responsible to perform async logic in redux
export const incrementAsync = amount => dispatch => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount));
    }, 1000);
};

//this function is called a 'selector' and is basically a getter for less code in the part accessing the store
export const selectCount = state => state.counter.value;

export default slice.reducer;