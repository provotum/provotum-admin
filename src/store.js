import { configureStore } from '@reduxjs/toolkit';
import electionReducer from './features/elections/electionSlice';
import chainReducer from './features/blockchain/chainSlice';
import uiBuilder from './features/uiBuilder/uiSlice';
export default configureStore({
    reducer: {
        elections: electionReducer,
        chain: chainReducer,
        uiBuilder: uiBuilder,
    }
})

//store.subscribe(() => console.log(store.getState()));

//store.dispatch(increment());