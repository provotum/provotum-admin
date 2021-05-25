import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hexToBn } from '@polkadot/util';
import { fetchPublicKeyShares, createVote, getVotes, combineDistributedKeys, startTally, closeVote, fetchResults } from './api/index';
// Async Actions (thunks)
export const newVote = createAsyncThunk('chain/newVote', async (payload) => {
    console.log('creating new vote');
    let result = await createVote(payload);
    return result;
})

export const combineDkgKeys = createAsyncThunk('elections/combineDkgKeys', async (payload) => {
    let result = await combineDistributedKeys(payload.vaUrl, payload.electionId);
    return result;
});


export const startVotingProcess = createAsyncThunk('elections/startVotingProcess', async (electionId) => {

});


export const startTallyingProcess = createAsyncThunk('elections/startTallyingProcess', async (payload) => {
    let result = await startTally(payload.vaUrl, payload.electionId);
    return result;
});

export const endVotingProcess = createAsyncThunk('elections/endVotingProcess', async (payload) => {
    let result = await closeVote(payload.vaUrl, payload.electionId);
    return result;
});

export const getElections = createAsyncThunk('elections/getElections', async (vaUrl) => {
    let result = await getVotes(vaUrl);
    for await (const vote of result) {
        let shares = await fetchPublicKeyShares(vaUrl, vote.electionId);
        vote.shares = shares;
        let results = await fetchResults(vaUrl, vote.electionId);
        vote.results = results;
    }

    return result;
});

export const getElectionResults = createAsyncThunk('elections/getElectionResults', async (payload) => {
    let result = await fetchResults(payload.vaUrl, payload.electionId);
    return result;
})

export const getElectionPublicKeyShares = createAsyncThunk('elections/getElectionPublicKeyShares', async (payload) => {
    // return result;
})

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
        [startTallyingProcess.fulfilled]: (state, action) => {
            console.log('started tallying')
        },
    }
})

//export actions
export const { electionAdded } = electionsSlice.actions;

//export selectors
export const selectElections = state => state.elections.elections;
export const selectVotingElections = state => state.elections.elections.filter(e => e.phase === 'Voting');
export const selectElectionById = (state, electionId) => state.elections.elections.find((election) => election.electionId === electionId);

//export reducer
export default electionsSlice.reducer;