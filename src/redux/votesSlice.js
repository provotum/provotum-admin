import { createSlice } from '@reduxjs/toolkit';

//a slice is a collection of redux reducer logic and actions for a single feature in the app
export const slice = createSlice({
    name: 'votes',
    initialState: {
        activeVotes: [],
    },
    //can only mutate the state directly when using the createSlice from the toolkit
    reducers: {
        addVotes: (state, action) => {
            console.log(action.payload);
            state.activeVotes = state.activeVotes.concat(action.payload);
        },
    }
})

export const { addVotes } = slice.actions

//this function is called a 'thunk' and is responsible to perform async logic in redux
export const fetchVotes = () => dispatch => {
    setTimeout(() => {
        // fake BC call for 1 second
        dispatch(addVotes([
            {
                id: 'public vote 42564',
                question: 'Is peanut butter better than jam?',
                answer_true: 'yes',
                answer_false: 'no',
            },
            {
                id: 'electoral vote 1',
                question: 'Whow should win the election?',
                answer_true: 'Trump',
                answer_false: 'Biden',
            }
        ]));
    }, 1000);
};

//this function is called a 'selector' and is basically a getter for less code in the part accessing the store
export const selectVotes = state => state.votes.activeVotes;

export default slice.reducer;