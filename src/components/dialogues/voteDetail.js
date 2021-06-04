import { Typography, Chip, Button, IconButton } from '@material-ui/core';
import { HowToVote, ThumbDown, ThumbUp } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import { useDispatch } from "react-redux";
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
    selectElections,
} from './../../features/elections/electionSlice';

import { closeVote } from "./../../features/elections/api";
import { selectSealers } from './../../features/blockchain/chainSlice';

import {
    combineDkgKeys,
    startTallyingProcess,
    endVotingProcess,
    getElectionPublicKeyShares
} from "./../../features/elections/electionSlice";
import { closeVoteDetail, selectSelectedElection, selectVoteDetailOpen } from '../../features/uiBuilder/uiSlice';
export function VoteDetail(props) {
    let electionId = useSelector(selectSelectedElection);
    //const open = useSelector(selectVoteDetailOpen);

    const elections = useSelector(selectElections);
    const election = elections.find(e => e.electionId === electionId);
    //const dispatch = useDispatch();
    const dispatch = useDispatch();
    const vaUrl = process.env.REACT_APP_VA_URL;
    const sealers = useSelector(selectSealers);

    const useStyles = makeStyles((theme) =>
        createStyles({
            root: {
                width: "100%",
            },
            button: {
                marginTop: theme.spacing(1),
                marginRight: theme.spacing(1),
            },
            actionsContainer: {
                marginBottom: theme.spacing(2),
            },
            resetContainer: {
                padding: theme.spacing(3),
            },
        })
    );
    const classes = useStyles();




    /*const handleNext = () => {
        switch (activeStep) {
            case 0:
                ;
                break;
            case 1:
                dispatch(
                    startTallyingProcess({
                        vaUrl: vaUrl,
                        electionId: election.electionId,
                    })
                );
                //dispatch(endVotingProcess({ vaUrl, electionId: election.electionId }));
                break;
            case 2:
                dispatch(endVotingProcess({ vaUrl, electionId: election.electionId }));
                break;
            default:
                break;
        }
        //setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };*/

    const voteQuestions = (vote) => {
        return vote.subjects.map(s => (
            <div key={s[0]} className="question-entry">
                <div className="question">
                    <HowToVote />
                    {s[1]}
                </div>
                <div className="answers">
                    <Chip
                        icon={<ThumbUp />}
                        label={'yes'}
                        color="primary"></Chip>
                    <Chip
                        icon={<ThumbDown />}
                        label={'no'}
                        color="secondary"></Chip>

                </div>

            </div>
        ));
    }

    const electionResults = (result) => {
        return (
            <div>
                {result.yes > result.no ? (
                    <div>
                        <Typography variant="body2" color="green" component="p">
                            {`Yes (${result.yes})`}
                        </Typography>
                        <Typography variant="body2" color="red" component="p">
                            {`No (${result.no})`}
                        </Typography>
                    </div>
                ) : (
                    <div>
                        <Typography variant="body2" color="red" component="p">
                            {`Yes (${result.yes})`}
                        </Typography>
                        <Typography variant="body2" color="green" component="p">
                            {`No (${result.no})`}
                        </Typography>
                    </div>
                )}
            </div>
        )
    }

    const electionSubjects = (election) => {
        return election.subjects.map((s) => (
            <div key={election.electionId + s[0]} className="election-topic">
                <p>{s[1]}</p>
                {election.results.find(r => r.subject_id === s[0]) && (
                    electionResults(election.results.find(r => r.subject_id === s[0]))
                )}

            </div>
        ));
    };

    const getPhaseSPecificContent = () => {
        let content = undefined;
        switch (election.phase) {
            case 'DistributedKeyGeneration':
                content = (
                    <div>
                        <Typography variant="body2">
                            {`got ${election.shares.length} key shares from ${sealers.length} sealers`}
                        </Typography>
                        <Button

                            onClick={() => {
                                dispatch(
                                    combineDkgKeys({ vaUrl: vaUrl, electionId: election.electionId })
                                )
                            }}
                            variant="contained" color="primary">start voting</Button>
                    </div>
                );
                break;
            case 'Tallying':
                if (election.results.length > 0) {
                    content = (
                        <div>
                            <Typography variant="body2">
                                {`This vote finished`}
                            </Typography>
                        </div>
                    );
                } else {
                    content = (
                        <div>
                            <Typography variant="body2">
                                {`This vote is currently being tallied`}
                            </Typography>
                            <Button
                                onClick={() => {
                                    dispatch(
                                        endVotingProcess({ vaUrl: vaUrl, electionId: election.electionId })
                                    )
                                }}
                                variant="contained" color="primary">publish</Button>
                        </div>
                    );
                }

                break;
            case 'Voting':
                content = (
                    <div>
                        <Typography variant="body2">
                            {`This vote is currently open`}
                        </Typography>
                        <Button
                            onClick={() => {
                                dispatch(
                                    endVotingProcess({ vaUrl: vaUrl, electionId: election.electionId })
                                )
                            }}
                            variant="contained" color="primary">start tallying</Button>
                    </div>
                );
                break;
            default:
                content = null;
                break;
        }
        return (
            <div>
                {election.phase}
                <div>
                    {content}
                </div>
            </div>
        )
    }


    return (
        <div className={`vote-detail`}>
            {election && (
                <div>
                    <div className="dialog-title title">
                        {election.title}
                        <IconButton
                            onClick={() => dispatch(closeVoteDetail())}
                            aria-label="settings" color='primary'>
                            <CloseIcon />
                        </IconButton>

                    </div>
                    <div className="dialog-subtitle">Topics</div>
                    <div className="question-list">
                        {electionSubjects(election)}
                    </div>
                    <div className="dialog-subtitle">Phase</div>
                    <div className="pane card">
                        {getPhaseSPecificContent()}
                    </div>

                </div>
            )}



        </div>
    )
}