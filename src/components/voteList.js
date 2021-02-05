import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchVotes,
    selectVotes,
} from './../redux/votesSlice';

export function VoteList() {
    // Components should always try to select the smallest possible amount of data they need from the store, which will help ensure that it only renders when it actually needs to.
    const votes = useSelector(selectVotes);
    const dispatch = useDispatch();

    const renderedVotes = votes.map(vote => (
        <div>
            {vote.id} - {vote.question}
            <div>
                <button>{vote.answer_true}</button>
                <button>{vote.answer_false}</button>
            </div>
        </div>

    ));


    return (
        <div>
            <h2>votes</h2>
            <button onClick={() => dispatch(fetchVotes())}>fetch votes</button>
            {renderedVotes}
        </div>
    )
}