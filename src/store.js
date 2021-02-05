import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "./redux/counterSlice";
import votesReducer from './redux/votesSlice';
export default configureStore({
    reducer: {
        counter: counterReducer,
        votes: votesReducer,
    }
})

//store.subscribe(() => console.log(store.getState()));

//store.dispatch(increment());