import { Typography, Button, Card, CardContent } from '@material-ui/core';
import React, { useEffect } from 'react'
import { getValidatorKeysForSealer, checkUp, getSealers, getSpec, createSpec, selectHealth, selectPeer, selectSealers, selectSpec, startChain, checkChain, stopChain, selectChain, getPeer } from './../features/blockchain/chainSlice';
import { useDispatch, useSelector } from 'react-redux';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import CircularProgress from '@material-ui/core/CircularProgress';
import Particles from "react-tsparticles";
import particles_config from './../assets/particles';
export function ChainStatus({ match }) {

    const vaUrl = process.env.REACT_APP_VA_URL
    const dispatch = useDispatch();
    const [particlesConfig, setParticlesConfig] = React.useState(particles_config);

    const [startingStata, setStartingState] = React.useState(0);
    const health = useSelector(selectHealth);
    const sealers = useSelector(selectSealers);
    const spec = useSelector(selectSpec);
    const chain = useSelector(selectChain);
    const peer = useSelector(selectPeer);
    useEffect(() => {
        dispatch(checkUp(vaUrl));
    }, [dispatch, vaUrl]);

    useEffect(async () => {
        await dispatch(checkChain(vaUrl));
        if (chain) {
            let config = particlesConfig;
            config.particles.move.enable = true;
            config.particles.number.value = 12;
            config.particles.opacity.value = 0.5
            setParticlesConfig(config);
        }
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
        await dispatch(startChain(vaUrl, false));
        let config = particlesConfig;
        config.particles.number.value = 12;
        config.particles.move.enable = true;
        config.particles.opacity.value = 0.5;
        setParticlesConfig(config);

    }
    const triggerRestartChain = () => {
        console.log('restarting chain');
        dispatch(startChain(vaUrl, true))
    }

    const triggerStopChain = () => {
        console.log('stopping chain');
        dispatch(stopChain(vaUrl))
        let config = particlesConfig;
        config.particles.move.enable = false;
        config.particles.opacity.value = 0;
        config.particles.number.value = 0;
        setParticlesConfig(config);
    }

    const triggerCheckUp = () => {
        dispatch(checkChain(vaUrl));
    };


    const [activeStep, setActiveStep] = React.useState(() => {
        console.log('chain is ', chain)
        return chain ? 1 : 0;
    });

    function particlesInit(main) {

        console.log(main);
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    }

    function particlesLoaded(container) {
        console.log(container);
    }


    return (
        <div className='content h-100'>
            <Particles
                init={particlesInit}
                loaded={particlesLoaded}
                className="particles"
                options={particlesConfig}>

            </Particles>
            <div className="container">
                <h1>Provotum</h1>
                <div className="card">
                    <div className="card-title">
                        System Health
                    </div>
                    <div className="card-body">
                        <Typography>
                            {`The Chain is currently ${chain ? 'up' : 'down'} and waiting for Sealers to register,
                                        you can start the chain anytime.`}
                        </Typography>
                        <Typography>
                            {`Currently, there are ${sealers.length} sealers registered`}
                        </Typography>
                        {chain ? (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={triggerStopChain}
                            >
                                stop chain
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={triggerStartChain}
                            >
                                start chain
                            </Button>
                        )}

                    </div>
                </div>
            </div>


        </div >
    )
}