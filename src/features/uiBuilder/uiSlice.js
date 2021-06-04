import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const storeLayout = createAsyncThunk('uiBuilder/storeLayout', async (payload) => {
    localStorage.setItem('layout', JSON.stringify(payload));
    return payload;
});

export const restoreLayout = createAsyncThunk('uiBuilder/restoreLayout', async () => {
    console.log('loading layout');
    const layout = localStorage.getItem('layout');
    if (layout) {
        return JSON.parse(layout);
    }
    return [
        { name: 'Number Open Elections', i: 'NumOpenElections', x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 2, active: true },
        { name: 'Actions', i: 'Actions', x: 4, y: 2, w: 1, h: 3, minW: 1, maxW: 2, minH: 2, maxH: 4, active: true },
        { name: 'Total Elections', i: 'NumElections', x: 1, y: 0, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 2, active: true },
        { name: 'Live Peer Count', i: 'LivePeers', x: 2, y: 0, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 2, active: true },
        { name: 'Participation Graph', i: 'VoterParticipation', x: 0, y: 6, w: 3, h: 4, minW: 3, maxW: 6, minH: 4, maxH: 8, active: true },
        { name: 'System Health', i: 'SystemHealth', x: 3, y: 0, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 2, active: true },
        { name: 'Sealer Status', i: 'SealerStatus', x: 4, y: 0, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 2, active: true },
        { name: 'Vote List', i: 'VoteList', x: 0, y: 1, w: 3, h: 6, minW: 3, maxW: 3, minH: 3, maxH: 8, active: true },
        { name: 'System Status', i: 'ChainStatus', x: 8, y: 5, w: 2, h: 2, minW: 2, maxW: 4, minH: 1, maxH: 2, active: true },
        { name: 'Logs', i: 'LiveLogs', x: 8, y: 5, w: 2, h: 2, minW: 2, maxW: 4, minH: 2, maxH: 5, active: true },

    ];
});

export const storeAppStates = createAsyncThunk('uiBuilder/storeAppStates', async (payload) => {
    localStorage.setItem('appstates', JSON.stringify(payload));
    return payload;
});

export const toggleAppState = createAsyncThunk('uiBuilder/toggleAppState', async (payload) => {
    let states = JSON.parse(localStorage.getItem('appstates'));
    let state = states.find(state => state.i === payload);
    state.active = !state.active;
    localStorage.setItem('appstates', JSON.stringify(states));
    return states;
});

export const restoreAppStates = createAsyncThunk('uiBuilder/restoreAppStates', async () => {
    console.log('loading app states');
    let states = localStorage.getItem('appstates');
    if (states) {
        return JSON.parse(states);
    }

    states = [
        { name: 'Number Open Elections', i: 'NumOpenElections', active: true, optional: true },
        //{ name: 'Actions', i: 'Actions', active: true, optional: false },
        { name: 'Total Elections', i: 'NumElections', active: true, optional: true },
        { name: 'Live Peer Count', i: 'LivePeers', active: true, optional: true },
        { name: 'Participation Graph', i: 'VoterParticipation', active: true, optional: true },
        { name: 'System Health', i: 'SystemHealth', active: true, optional: true },
        { name: 'Sealer Status', i: 'SealerStatus', active: true, optional: true },
        { name: 'Vote List', i: 'VoteList', active: true, optional: false },
        { name: 'System Status', i: 'ChainStatus', active: true, optional: true },
        { name: 'Logs', i: 'LiveLogs', active: true, optional: true },

    ];
    localStorage.setItem('appstates', JSON.stringify(states));
    return states;
});

export const newEvent = createAsyncThunk('uiBuilder/newEvent', async (payload) => {
    let d = new Date();
    let datetime = `${d.getDate()}/${d.getMonth()} - ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    return { time: datetime, message: payload };
});


//a slice is a collection of redux reducer logic and actions for a single feature in the app
export const slice = createSlice({
    name: 'uiBuilder',
    initialState: {
        addVoteFormOpen: false,
        voteDetailOpen: false,
        selectedElection: -1,
        layout: [],
        states: [],
        events: [],
    },
    //can only mutate the state directly when using the createSlice from the toolkit
    reducers: {
        openVoteForm: (state, action) => {
            state.addVoteFormOpen = true;
        },
        closeVoteForm: (state, action) => {
            state.addVoteFormOpen = false;
        },
        openVoteDetail: (state, action) => {
            state.voteDetailOpen = true;
        },
        closeVoteDetail: (state, action) => {
            state.voteDetailOpen = false;
        },
        selectElection: (state, action) => {
            state.selectedElection = action.payload;
        }
    },
    extraReducers: {
        [newEvent.fulfilled]: (state, action) => {
            state.events.unshift(action.payload);
        },
        [storeLayout.fulfilled]: (state, action) => {
            state.layout = action.payload;
        },
        [restoreLayout.fulfilled]: (state, action) => {
            state.layout = action.payload;
        },
        [storeAppStates.fulfilled]: (state, action) => {
            state.states = action.payload;
        },
        [restoreAppStates.fulfilled]: (state, action) => {
            state.states = action.payload;
        },
        [toggleAppState.fulfilled]: (state, action) => {
            state.states = action.payload;
        },
    }
})

export const { openVoteForm, closeVoteForm, openVoteDetail, closeVoteDetail, selectElection } = slice.actions


export const selectAddVoteFormOpen = state => state.uiBuilder.addVoteFormOpen;
export const selectVoteDetailOpen = state => state.uiBuilder.voteDetailOpen;
export const selectSelectedElection = state => state.uiBuilder.selectedElection;
export const selectLayout = state => state.uiBuilder.layout;
export const selectAppStates = state => state.uiBuilder.states;
export const selectEvents = state => state.uiBuilder.events;
export default slice.reducer;