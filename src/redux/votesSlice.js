import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getVotesFake, addVoteFake } from './../api/fakeApi';

//this function is called a 'thunk' and is responsible to perform async logic in redux
export const fetchVotes = createAsyncThunk('votes/fetchVotes', async () => {
    let response = await getVotesFake();
    return response;
});

export const addVote = createAsyncThunk('votes/addVote', async (data) => {
    const response = await addVoteFake(data);
    return response;
});

//a slice is a collection of redux reducer logic and actions for a single feature in the app
export const voteSlice = createSlice({
    name: 'votes',
    initialState: {
        votes: [],
        status: 'idle',
        error: '',
    },
    //can only mutate the state directly when using the createSlice from the toolkit
    reducers: {
    },
    extraReducers: {
        [fetchVotes.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchVotes.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.votes = state.votes.concat(action.payload);
        },
        [fetchVotes.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
        },
        [addVote.fulfilled]: (state, action) => {
            state.votes.push(action.payload);
        }
    }
})


export const { voteAdded } = voteSlice.actions;

//this function is called a 'selector' and is basically a getter for less code in the part accessing the store
export const selectVotes = state => state.votes.votes;

export const selectVoteById = (state, voteId) => state.votes.votes.find((vote) => vote.id === voteId);
export default voteSlice.reducer;