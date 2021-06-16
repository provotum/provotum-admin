import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    selectElections,
} from '../../features/elections/electionSlice';
import { ElectionCard } from './../electionCard';

import { openVoteForm, selectAddVoteFormOpen, selectVoteDetailOpen } from './../../features/uiBuilder/uiSlice';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { VoteDetail } from '../dialogues/voteDetail';
import { AddVoteForm } from '../dialogues/addVoteForm';



export function VoteList(props) {
    const vaUrl = process.env.REACT_APP_VA_URL
    const dispatch = useDispatch();
    const elections = useSelector(selectElections);
    const [filter, setFilter] = useState('');
    const voteDetailOpen = useSelector(selectVoteDetailOpen);
    const voteFormOpen = useSelector(selectAddVoteFormOpen)
    const changeFilter = (value) => {
        setFilter(value);
    }
    const isActiveFilter = (value) => {
        return filter === value;
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

    const triggerAddForm = () => {
        dispatch(openVoteForm());
    }


    return (
        <div className={`module vote-list`}>
            <div className="module-title">
                Votes
            </div>
            <div className="module-content vote-list-module-content">

                {!voteDetailOpen && !voteFormOpen && (
                    <div className="add-button-container">
                        <div className="filter">
                            <p>Filter</p>
                            <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                                <Button
                                    onClick={() => { changeFilter('DistributedKeyGeneration'); }}
                                    color={isActiveFilter('DistributedKeyGeneration') ? 'primary' : ''}>dkg</Button>
                                <Button
                                    onClick={() => { changeFilter('Tallying'); }}
                                    color={isActiveFilter('Tallying') ? 'primary' : ''}>tallying</Button>
                                <Button
                                    onClick={() => { changeFilter('Voting'); }}
                                    color={isActiveFilter('Voting') ? 'primary' : ''}>voting</Button>
                                <Button
                                    onClick={() => { changeFilter(''); }}
                                    color={isActiveFilter('') ? 'primary' : ''}>none</Button>
                            </ButtonGroup>

                        </div>


                    </div>
                )}
                {!voteDetailOpen && !voteFormOpen && (

                    <div className='add-vote-button'
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={triggerAddForm}
                            startIcon={<AddCircleRoundedIcon />}
                        >
                            New
                        </Button>
                    </div>
                )}

                <div className={`vote-list-container ${voteDetailOpen ? 'right' : voteFormOpen ? 'left' : ''}`}>
                    <div className="vote-form">
                        <AddVoteForm />
                    </div>
                    <div className="vote-list">
                        {renderedElections}
                    </div>
                    <div className="vote-detail">
                        <VoteDetail />
                    </div>


                </div>

            </div>

        </div >
    )
}