import { Typography, Chip, Button } from '@material-ui/core';
import { HowToVote, ThumbDown, ThumbUp } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import { useDispatch } from "react-redux";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
    selectElections,
} from '../features/elections/electionSlice';
import {
    useParams
} from "react-router-dom";
import { closeVote } from "../features/elections/api";
import { selectSealers } from './../features/blockchain/chainSlice';

import {
    combineDkgKeys,
    startTallyingProcess,
    endVotingProcess,
    getElectionPublicKeyShares
} from "./../features/elections/electionSlice";
export function SingleVotePage() {
    let { electionId } = useParams();
    console.log(electionId);
    const elections = useSelector(selectElections);
    console.log(elections);
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


    function getStepContent(step) {
        switch (step) {
            case 0:
                return {
                    message: `This vote is currently in the distributed key generation phase. As soon as all sealers have submitted their keys, you can start the voting phase`,
                    button: "start vote",
                };
            case 1:
                return {
                    message:
                        "This vote is currently in the voting phase. When the official voting period has ended you can start tallying",
                    button: "tally",
                };
            case 2:
                return {
                    message: `This vote is currently being tallied, as soon as the process is finished, you can publish the results`,
                    button: "publish",
                };
            default:
                return {
                    message: "This vote has concluded and the results are available",
                    button: false,
                };
        }
    }

    const steps = [
        "DistributedKeyGeneration",
        "Voting",
        "Tallying",
        "Results",
    ];
    const [activeStep, setActiveStep] = React.useState(() => {
        let step = steps.indexOf(election.phase);
        if (step === 2 && election.results.length > 0) {
            step = 3;
        }
        return step;
    });
    const handleNext = () => {
        console.log(`current step: ${steps[activeStep]}`);
        switch (activeStep) {
            case 0:
                dispatch(
                    combineDkgKeys({ vaUrl: vaUrl, electionId: election.electionId })
                );
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
    };

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
            <div key={election.electionId + s[0]}>
                <Typography paragraph>{s[1]}</Typography>
                {election.results.find(r => r.subject_id === s[0]) ? (
                    electionResults(election.results.find(r => r.subject_id === s[0]))
                ) : (
                    <Typography variant="body2" color="textSecondary" component="p">
                        {"Yes"}, {"No"}
                    </Typography>
                )}

            </div>
        ));
    };


    return (
        <div className="container-fluid two-pane">
            <div className="pane card">
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                <Typography>{getStepContent(index).message}</Typography>

                                <div className={classes.actionsContainer}>
                                    <div>
                                        {getStepContent(index).button && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                            >
                                                {getStepContent(index).button}
                                            </Button>
                                        )}
                                        {label === 'DistributedKeyGeneration' && (
                                            <Typography variant="body2">
                                                {`got ${election.shares.length} key shares from ${sealers.length} sealers`}
                                            </Typography>
                                        )}

                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <div className="pane card">
                <Typography variant="h2">{election.title}</Typography>
                <Typography variant="body1">{election.description}</Typography>
                <Typography variant="h3">Questions</Typography>
                <div className="question-list">
                    {electionSubjects(election)}
                </div>
            </div>


        </div>
    )
}