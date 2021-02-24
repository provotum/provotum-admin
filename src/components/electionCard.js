import { Button, Card, CardActions, CardContent, CardHeader, Typography, Collapse, IconButton, Avatar } from '@material-ui/core';
import { Lock, HourglassEmpty, HowToVote, GroupWork, ExpandMore } from '@material-ui/icons';
import { combineDkgKeys } from './../features/elections/electionSlice';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',
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
    }),
);


export function ElectionCard(props) {
    let election = props.election;
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);
    const vaUrl = process.env.REACT_APP_VA_URL
    const classes = useStyles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const triggerDkg = (electionId) => {
        console.log('triggering dkg')
        dispatch(combineDkgKeys({ vaUrl: vaUrl, electionId: electionId }));
    }

    const icon = (election) => {
        switch (election.phase) {
            case 'Tallying':
                return <HourglassEmpty />
            case 'Voting':
                return <HowToVote />
            case 'DistributedKeyGeneration':
                return <GroupWork />
            default:
                return <Lock />
        }
    };

    const electionSubjects = (election) => {
        return election.subjects.map(s => (

            <div key={election.electionId + s[0]}>
                <Typography paragraph>{s[1]}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {'Yes'}, {'No'}
                </Typography>
            </div>
        ));
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return {
                    message: `This vote is currently in the distributed key generation phase. As soon as all sealers have submitted their keys, you can start the voting phase`,
                    button: 'start vote'
                };
            case 1:
                return {
                    message: 'This vote is currently in the voting phase. When the official voting period has ended you can start tallying',
                    button: 'tally'
                };
            case 2:
                return {
                    message: `This vote is currently being tallied, as soon as the process is finished, you can publish the results`,
                    button: 'publish'
                };
            default:
                return {
                    message: 'Unknown step'
                };
        }
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['DistributedKeyGeneration', 'Voting', 'Tallying'];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar className="bg-accent" >
                        {icon(election)}
                    </Avatar>
                }
                title={election.title}
                subheader={election.createdOn}>

            </CardHeader>
            <CardContent>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                <Typography>{getStepContent(index).message}</Typography>
                                <div className={classes.actionsContainer}>
                                    <div>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {getStepContent(index).button}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>

            </CardContent>
            <CardActions>
                <Button>
                    edit
                </Button>
                <Link to={`/elections/${election.id}`} className="button muted-button">
                    View election
      </Link>
                <IconButton

                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMore />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Button onClick={() => { triggerDkg(election.electionId) }}>
                        dkg
                    </Button>
                    {electionSubjects(election)}
                </CardContent>
            </Collapse>
        </Card>
    )
}