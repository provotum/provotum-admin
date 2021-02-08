import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import {
    fetchVotes,
    selectVotes,
} from './../redux/votesSlice';
import { VoteCard } from './voteCard';

export function VoteList() {
    // Components should always try to select the smallest possible amount of data they need from the store, which will help ensure that it only renders when it actually needs to.
    const votes = useSelector(selectVotes);
    const dispatch = useDispatch();

    //get vote status from state and load votes if not done yet
    const voteStatus = useSelector(state => state.votes.status);
    useEffect(() => {
        if (voteStatus === 'idle') {
            dispatch(fetchVotes())
        }
    }, [voteStatus, dispatch]);

    const renderedVotes = votes.map(vote => (
        <VoteCard vote={vote} key={vote.id}></VoteCard>
    ));


    return (
        <div>
            <h2>votes</h2>
            <div className="vote-list">
                {renderedVotes}
            </div>
        </div>
    )
}