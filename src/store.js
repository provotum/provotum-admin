import { configureStore } from '@reduxjs/toolkit';
import electionReducer from './features/elections/electionSlice';
import chainReducer from './features/blockchain/chainSlice';
export default configureStore({
    reducer: {
        elections: electionReducer,
        chain: chainReducer,
    }
})

//store.subscribe(() => console.log(store.getState()));

//store.dispatch(increment());