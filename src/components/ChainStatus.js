import { Typography, Button, Card, CardContent } from '@material-ui/core';
import React, { useEffect } from 'react'
import { getValidatorKeysForSealer, checkUp, getSealers, getSpec, createSpec, selectHealth, selectPeer, selectSealers, selectSpec, startChain, checkChain, stopChain, selectChain, getPeer } from './../features/blockchain/chainSlice';
import { useDispatch, useSelector } from 'react-redux';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import CircularProgress from '@material-ui/core/CircularProgress';

export function ChainStatus({ match }) {

    const vaUrl = process.env.REACT_APP_VA_URL
    const dispatch = useDispatch();
    const [startingStata, setStartingState] = React.useState(0);
    const health = useSelector(selectHealth);
    const sealers = useSelector(selectSealers);
    const spec = useSelector(selectSpec);
    const chain = useSelector(selectChain);
    const peer = useSelector(selectPeer);
    useEffect(() => {
        dispatch(checkUp(vaUrl));
    }, [dispatch, vaUrl]);

    useEffect(() => {
        dispatch(checkChain(vaUrl));
    }, [dispatch, vaUrl]);

    useEffect(() => {
        dispatch(getSealers(vaUrl));
    }, [dispatch, vaUrl]);

    useEffect(() => {
        dispatch(getPeer(vaUrl));
    }, [dispatch, vaUrl]);

    /*useEffect(() => {
        dispatch(createSpec(vaUrl));
    }, [dispatch, vaUrl]);
    */

    useEffect(() => {
        dispatch(getSpec(vaUrl));
    }, [dispatch, vaUrl]);

    const triggercheckValidatorKeys = (sealer) => {
        console.log('checking validator keys for sealer')
        dispatch(getValidatorKeysForSealer({ vaUrl, sealer }));
    }


    const renderSealers = sealers.map(s => (
        <div key={s.auraAddress} className="sealer" id={s.auraAddress}>
            <div>
                <Typography variant="body1">name: {s.name}</Typography>
                {!s.validatorKeysInserted ? (
                    <Button onClick={() => { triggercheckValidatorKeys(s) }}>check val keys</Button>

                ) : (
                    <p>keys inserted!</p>
                )}

            </div>

        </div>
    ));



    const getSpecValues = () => {
        let list = Object.entries(spec).map(s => {
            return { key: s[0], value: String(s[1]) }
        });
        return list;
    }

    const renderSpec = getSpecValues().map(t => (
        <div key={t.key} className="spec">
            <div><Typography variant="body1">{t.key}: {t.value}</Typography></div>
        </div>
    ));

    const triggerCreateSpec = () => {
        console.log('creating spec')
        dispatch(createSpec(vaUrl));
    }


    const triggerStartChain = async () => {
        console.log('starting chain');
        setStartingState(1);
        await dispatch(createSpec(vaUrl));
        setStartingState(2);
        dispatch(startChain(vaUrl, false));

    }
    const triggerRestartChain = () => {
        console.log('restarting chain');
        dispatch(startChain(vaUrl, true))
    }

    const triggerStopChain = () => {
        console.log('stopping chain');
        dispatch(stopChain(vaUrl))
    }

    const triggerCheckUp = () => {
        dispatch(checkChain(vaUrl));
    };


    const [activeStep, setActiveStep] = React.useState(() => {
        console.log('chain is ', chain)
        return chain ? 1 : 0;
    });


    return (
        <div>
            <Card>
                <Stepper activeStep={chain ? 1 : 0} orientation="vertical">
                    <Step>
                        <StepLabel>Waiting for sealers</StepLabel>
                        <StepContent>
                            {health.health === 'up' ? (
                                <div>
                                    <Typography>
                                        {`The Chain is currently ${chain ? 'up' : 'down'} and waiting for Sealers to register,
                                        you can start the chain anytime.`}
                                    </Typography>
                                    <Typography>
                                        {`Currently, there are ${sealers.length} sealers registered`}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={triggerStartChain}
                                    >
                                        start chain
                      </Button>
                                </div>
                            ) : (
                                <Typography>
                                    {`The VA server is currently ${health.health}`}
                                </Typography>
                            )}

                            {startingStata === 1 && (
                                <div>
                                    <CircularProgress />
                                    <Typography>creating chain spec</Typography>
                                </div>
                            )}
                            {startingStata === 2 && (
                                <div>
                                    <CircularProgress />
                                    <Typography>starting chain</Typography>
                                </div>
                            )}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Online</StepLabel>
                        <StepContent>
                            <Button onClick={triggerStopChain}>stop chain</Button>
                            <Typography></Typography>
                        </StepContent>
                    </Step>

                </Stepper>
            </Card>
            <Typography variant="h2">Sealers</Typography>
            <div className="sealer-container">
                {renderSealers}
            </div>

        </div >
    )
}