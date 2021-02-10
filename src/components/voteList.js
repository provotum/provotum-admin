import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';


import {
    selectElections,
} from '../redux/electionSlice';
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
            case 'current':
                return elections.filter(v => v.status === 'open');
            default:
                return elections;
        }
    }

    const renderedElections = filteredElections().map(election => (
        <ElectionCard election={election} key={election.electionId}></ElectionCard>
    ));


    return (
        <div>
            <h2>votes</h2>
            <Button
                onClick={() => { changeFilter('current'); }}
                variant="contained" color="primary">open</Button>
            <Button
                onClick={() => { changeFilter(''); }}
                variant="contained" color="primary">reset</Button>
            <div className="vote-list">
                {renderedElections}
            </div>
        </div>
    )
}