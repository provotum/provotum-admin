import { Typography, Button } from '@material-ui/core';
import React, { useEffect } from 'react'
import { checkUp, getSealers, getSpec, createSpec, selectHealth, selectSealers, selectSpec, startChain, checkChain, stopChain, selectChain } from './../features/blockchain/chainSlice';
import { useDispatch, useSelector } from 'react-redux';

export function ChainStatus({ match }) {

    const vaUrl = process.env.REACT_APP_VA_URL
    const dispatch = useDispatch();

    const health = useSelector(selectHealth);
    const sealers = useSelector(selectSealers);
    const spec = useSelector(selectSpec);
    const chain = useSelector(selectChain);

    useEffect(() => {
        dispatch(checkUp(vaUrl));
    }, [dispatch, vaUrl]);

    useEffect(() => {
        dispatch(checkChain(vaUrl));
    }, [dispatch, vaUrl]);

    useEffect(() => {
        dispatch(getSealers(vaUrl));
    }, [dispatch, vaUrl]);

    /*useEffect(() => {
        dispatch(createSpec(vaUrl));
    }, [dispatch, vaUrl]);
    */

    useEffect(() => {
        dispatch(getSpec(vaUrl));
    }, [dispatch, vaUrl]);

    const renderSealers = sealers.map(s => (
        <div key={s.auraAddress} className="sealer">
            <div><Typography variant="body1">name: {s.name}</Typography></div>

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

    const triggerStartChain = () => {
        console.log('starting chain');
        dispatch(startChain(vaUrl, false))
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
    const renderControls = () => {
        if (chain) {
            return (
                <div>
                    <Button onClick={triggerRestartChain}>restart chain</Button>
                    <Button onClick={triggerStopChain}>stop chain</Button>
                </div>
            )
        } else {
            return (
                <div>
                    <Button onClick={triggerCreateSpec}>create spec</Button>
                    <Button onClick={triggerStartChain}>start chain</Button>
                </div>
            )
        }
    }


    return (
        <div>
            <Typography variant="h1">Chain</Typography>
            <Typography variant="h2">status</Typography>
            <Typography variant="body1">server: {health.health}</Typography>
            <Typography variant="body1">chain: {chain ? 'up' : 'down'}</Typography>
            {renderControls()}
            <Typography variant="h2">Sealers</Typography>
            {renderSealers}

        </div >
    )
}