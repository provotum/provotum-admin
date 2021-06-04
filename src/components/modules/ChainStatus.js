import { Typography, Button, Card, CardContent } from '@material-ui/core';
import React, { useEffect } from 'react'
import { getValidatorKeysForSealer, checkUp, getSealers, getSpec, createSpec, selectHealth, selectPeer, selectSealers, selectSpec, startChain, checkChain, stopChain, selectChain, getPeer } from '../../features/blockchain/chainSlice';
import { useDispatch, useSelector } from 'react-redux';

import Particles from "react-tsparticles";
import particles_config from '../../assets/particles';
export function ChainStatus(props) {

    let open = props.open;
    const vaUrl = process.env.REACT_APP_VA_URL
    const dispatch = useDispatch();
    const [particlesConfig, setParticlesConfig] = React.useState(particles_config);

    const [startingStata, setStartingState] = React.useState(0);
    const health = useSelector(selectHealth);
    const sealers = useSelector(selectSealers);
    const spec = useSelector(selectSpec);
    const chain = useSelector(selectChain);
    useEffect(() => {
        dispatch(checkUp(vaUrl));
    }, [dispatch, vaUrl]);

    useEffect(async () => {
        dispatch(checkChain(vaUrl));
        if (chain) {
            //let config = particlesConfig;
            //config.particles.move.enable = true;
            //config.particles.number.value = 12;
            //config.particles.opacity.value = 0.5
            //setParticlesConfig(config);
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


    const triggerStartChain = async () => {
        console.log('starting chain');
        setStartingState(1);
        await dispatch(createSpec(vaUrl));
        setStartingState(2);
        await dispatch(startChain(vaUrl, false));
        let config = particlesConfig;
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


    function particlesInit(main) {

        console.log(main);
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    }

    function particlesLoaded(container) {
        //console.log(container);
    }


    return (
        <div className={`module bg-provotum chain-status ${!chain ? 'overlay' : ''}`}>
            <Particles
                init={particlesInit}
                loaded={particlesLoaded}
                className="particles"
                options={particlesConfig}>

            </Particles>
            <div className="container">
                <h1>System Status</h1>
                <div className="card">
                    <div className="card-body">
                        <Typography>
                            {`The System is currently ${chain ? 'running' : 'down'}.`}
                        </Typography>
                        {chain ? (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={triggerStopChain}
                            >
                                Stop System
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={triggerStartChain}
                            >
                                Start System
                            </Button>
                        )}

                    </div>
                </div>
            </div>


        </div >
    )
}