import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkValidatorKeysForSealer, checkVotingAuthorityUp, getRegisteredSealers, fetchChainSpec, createChainSpec, startChainNode, checkChainUp, stopChainNode, fetchPeer } from './api/index';


export const checkUp = createAsyncThunk('chain/checkUp', async (vaUrl) => {
    let result = await checkVotingAuthorityUp(vaUrl)
    return result
});

export const checkChain = createAsyncThunk('chain/checkChain', async (vaUrl) => {
    let result = await checkChainUp(vaUrl);
    console.log('arstartratartartr', result);
    return result;
});

export const getSealers = createAsyncThunk('chain/getSealers', async (vaUrl) => {
    let result = await getRegisteredSealers(vaUrl);

    return result
});

export const getValidatorKeysForSealer = createAsyncThunk('chain/getValidatorKeysForSealer', async (payload) => {
    let result = await checkValidatorKeysForSealer(payload.vaUrl, payload.sealer);
    console.log(result);
    return result
});

export const getPeer = createAsyncThunk('chain/getPeer', async (vaUrl) => {
    let result = await fetchPeer(vaUrl)
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
    console.log('started', result);
    return result;
});

export const stopChain = createAsyncThunk('chain/stopChain', async (vaUrl, restart) => {
    console.log('stoping chain')
    let result = await stopChainNode(vaUrl, restart);
    console.log('stoped', result);
    return result
});




//a slice is a collection of redux reducer logic and actions for a single feature in the app
export const slice = createSlice({
    name: 'chain',
    initialState: {
        vaHealth: '',
        sealers: [],
        spec: {},
        chain: false,
        peers: [],
    },
    //can only mutate the state directly when using the createSlice from the toolkit
    reducers: {
        setUrl: (state, action) => {
            state.url = action.payload
        },
        externalAddresses: (state, action) => {
            state.peers = action.payload;
        },
        setChain: (state, action) => {
            state.chain = action.payload;
        }
    },
    extraReducers: {
        [startChain.fulfilled]: (state, action) => {
            if (action.payload.pid) {
                state.chain = true;
            }
        },
        [stopChain.fulfilled]: (state, action) => {
            if (action.payload.killed) {
                state.chain = false;
            }
        },
        [getValidatorKeysForSealer.fulfilled]: (state, action) => {
            let sealer = state.sealers.find(s => s.name === action.payload.sealerName);
            if (sealer) {
                sealer.validatorKeysInserted = action.payload.response.auraAddress && action.payload.response.grandpaAddress;
            }
        },
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
                    s.validatorKeysInserted = false;
                    state.sealers.push(s);
                }
            })
            //state.sealers = state.sealers.concat(action.payload);
        },
        [getPeer.fulfilled]: (state, action) => {
            state.peer = action.payload;
        },
        [getSpec.fulfilled]: (state, action) => {
            state.spec = action.payload;
        },
        [createSpec.fulfilled]: (state, action) => {
            state.spec = action.payload;
        },

    }
})

export const { setUrl, externalAddresses, setChain } = slice.actions

//this function is called a 'selector' and is basically a getter for less code in the part accessing the store
export const selectHealth = state => state.chain.vaHealth;
export const selectSealers = state => state.chain.sealers;
export const selectSpec = state => state.chain.spec;
export const selectChain = state => state.chain.chain;
export const selectPeers = state => state.chain.peers;
export default slice.reducer;