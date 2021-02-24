import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkVotingAuthorityUp, getRegisteredSealers, fetchChainSpec, createChainSpec, startChainNode, checkChainUp, stopChainNode } from './api/index';

export const checkUp = createAsyncThunk('chain/checkUp', async (vaUrl) => {
    let result = await checkVotingAuthorityUp(vaUrl)
    return result
});

export const checkChain = createAsyncThunk('chain/checkChainup', async (sealer) => {
    let result = await checkChainUp(sealer);
    return result;
});

export const getSealers = createAsyncThunk('chain/getSealers', async (vaUrl) => {
    let result = await getRegisteredSealers(vaUrl)
    return result
});

export const getSpec = createAsyncThunk('chain/getChainSpec', async (vaUrl) => {
    let result = await fetchChainSpec(vaUrl)
    return result
});

export const createSpec = createAsyncThunk('chain/createChainSpec', async (vaUrl) => {
    console.log('pest')
    let result = await createChainSpec(vaUrl)
    return result
});

export const startChain = createAsyncThunk('chain/startChain', async (vaUrl, restart) => {
    console.log('starting chain')
    let result = await startChainNode(vaUrl, restart);
    return result
});

export const stopChain = createAsyncThunk('chain/stopChain', async (vaUrl, restart) => {
    console.log('stoping chain')
    let result = await stopChainNode(vaUrl, restart);
    return result
});




//a slice is a collection of redux reducer logic and actions for a single feature in the app
export const slice = createSlice({
    name: 'chain',
    initialState: {
        vaHealth: '',
        sealers: [],
        spec: {},
        chain: {},
    },
    //can only mutate the state directly when using the createSlice from the toolkit
    reducers: {
        setUrl: (state, action) => {
            state.url = action.payload
        }
    },
    extraReducers: {
        [checkUp.fulfilled]: (state, action) => {
            state.vaHealth = action.payload;
        },
        [checkChain.fulfilled]: (state, action) => {
            state.chain = action.payload;
        },
        [getSealers.fulfilled]: (state, action) => {
            action.payload.forEach(s => {
                let exists = state.sealers.map(ss => ss.name).find(n => n === s.name);
                if (!exists) {
                    state.sealers.push(s);
                }
            })
            //state.sealers = state.sealers.concat(action.payload);
        },
        [getSpec.fulfilled]: (state, action) => {
            state.spec = action.payload;
        },
        [createSpec.fulfilled]: (state, action) => {
            state.spec = action.payload;
        },

    }
})

export const { setUrl } = slice.actions


//this function is called a 'selector' and is basically a getter for less code in the part accessing the store
export const selectHealth = state => state.chain.vaHealth;
export const selectSealers = state => state.chain.sealers;
export const selectSpec = state => state.chain.spec;
export const selectChain = state => state.chain.chain;
export default slice.reducer;