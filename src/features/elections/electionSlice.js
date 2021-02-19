import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hexToBn } from '@polkadot/util';
import { createVote, getVotes, combineDistributedKeys } from './api/index';
// Async Actions (thunks)
export const newVote = createAsyncThunk('chain/newVote', async (vaUrl) => {
    console.log('creating new vote');
    let result = await createVote(vaUrl);
    return result;
})

export const combineDkgKeys = createAsyncThunk('elections/combineDkgKeys', async (payload) => {
    let result = await combineDistributedKeys(payload.vaUrl, payload.electionId);
    return result;
});


export const startVotingProcess = createAsyncThunk('elections/startVotingProcess', async (electionId) => {

});

export const endVotingProcess = createAsyncThunk('elections/endVotingProcess', async (electionId) => {

});

export const startTallyingProcess = createAsyncThunk('elections/startTallyingProcess', async (electionId) => {

});

export const getElections = createAsyncThunk('elections/getElections', async (vaUrl) => {
    let result = await getVotes(vaUrl);
    return result;
});

// Main slice
export const electionsSlice = createSlice({
    name: 'elections',
    initialState: {
        elections: [],
        status: 'ready',
        error: '',
    },
    reducers: {
    },
    // Automatically listen to changes in the async actions
    extraReducers: {
        [getElections.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getElections.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.elections = state.elections.concat(action.payload);
        },
        [getElections.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
        },
        [newVote.fulfilled]: (state, action) => {
            console.log('created vote')
        },
    }
})

//export actions
export const { electionAdded } = electionsSlice.actions;

//export selectors
export const selectElections = state => state.elections.elections;
export const selectElectionById = (state, electionId) => state.elections.elections.find((election) => election.id === electionId);

//export reducer
export default electionsSlice.reducer;