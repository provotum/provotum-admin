import { configureStore } from '@reduxjs/toolkit';
import electionReducer from './redux/electionSlice';

export default configureStore({
    reducer: {
        elections: electionReducer,
    }
})

//store.subscribe(() => console.log(store.getState()));

//store.dispatch(increment());