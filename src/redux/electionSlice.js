import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addVoteFake } from '../api/fakeApi';
import { hexToBn } from '@polkadot/util';

// Async Actions (thunks)
export const addElection = createAsyncThunk('elections/addVote', async (data) => {
    const response = await addVoteFake(data);
    return response;
});

export const getElections = createAsyncThunk('elections/getElections', async (api) => {
    await api.isReady;
    let electionPromises = await api.query.provotum.elections.entries();
    let elections = [];
    for await (const [key, electionEncoded] of electionPromises) {
        const election = electionEncoded.toHuman();
        const electionId = key.args.map((k) => k.toHuman())[0];
        const subjectsResponse = await api.query.provotum.subjects(electionId);
        const publicKeyResponse = await api.query.provotum.publicKey(electionId);

        elections.push({
            electionId,
            ...election,
            params: {
                p: hexToBn(election.params.p),
                g: hexToBn(election.params.g),
                q: hexToBn(election.params.p).subn(1).divn(2),
            },
            subjects: subjectsResponse.toHuman(),
            publicKey: hexToBn(publicKeyResponse.toHuman()),
        });
    }
    return elections;
});

// Main slice
export const electionsSlice = createSlice({
    name: 'elections',
    initialState: {
        elections: [],
        status: 'ready',
        error: '',
    },
    //can only mutate the state directly when using the createSlice from the toolkit
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
        [addElection.fulfilled]: (state, action) => {
            state.elections.push(action.payload);
        }
    }
})

//export actions
export const { electionAdded } = electionsSlice.actions;

//export selectors
export const selectElections = state => state.elections.elections;
export const selectElectionById = (state, electionId) => state.elections.elections.find((election) => election.id === electionId);

//export reducer
export default electionsSlice.reducer;