import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';


import {
    selectElections,
} from '../features/elections/electionSlice';
import { ElectionCard } from './electionCard';

export function VoteList() {
    // Components should always try to select the smallest possible amount of data they need from the store, which will help ensure that it only renders when it actually needs to.
    const elections = useSelector(selectElections);
    const [filter, setFilter] = useState('');

    const changeFilter = (value) => {
        setFilter(value);
    }

    const filteredElections = () => {
        switch (filter) {
            case '':
                return elections;
            default:
                return elections.filter(v => v.phase === filter);
        }
    }

    const renderedElections = filteredElections().map(election => (
        <ElectionCard election={election} key={election.electionId}></ElectionCard>
    ));


    return (
        <div>
            <h2>votes</h2>
            <p>filter</p>
            <Button
                onClick={() => { changeFilter('DistributedKeyGeneration'); }}
                variant="contained" color="primary">dkg</Button>
            <Button
                onClick={() => { changeFilter('Tallying'); }}
                variant="contained" color="primary">tallying</Button>
            <Button
                onClick={() => { changeFilter('Voting'); }}
                variant="contained" color="primary">voting</Button>
            <Button
                onClick={() => { changeFilter(''); }}
                variant="contained" color="primary">reset</Button>
            <div className="vote-list">
                {renderedElections}
            </div>
        </div>
    )
}