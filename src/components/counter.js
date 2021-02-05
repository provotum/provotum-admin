import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    decrement,
    increment,
    incrementAsync,
    incrementByAmount,
    selectCount
} from './../redux/counterSlice';

export function Counter() {
    // Components should always try to select the smallest possible amount of data they need from the store, which will help ensure that it only renders when it actually needs to.
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    //local state since only the counter cares about this value
    const [incrementAmount, setIncrementAmount] = useState('2');

    return (
        <div>
            <button aria-label="Increment value" onClick={() => dispatch(increment())}>+</button>
            <span>{count}</span>
            <button aria-lable="decrement value" onClick={() => dispatch(decrement())}>-</button>
            <button onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}>inc async</button>
        </div>
    )
}