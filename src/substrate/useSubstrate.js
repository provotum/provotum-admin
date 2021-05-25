import { useContext, useEffect, useCallback } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import keyring from '@polkadot/ui-keyring';

import config from './config';
import { SubstrateContext } from './SubstrateContext';

const useSubstrate = () => {
    const [state, dispatch] = useContext(SubstrateContext);

    // `useCallback` so that returning memoized function and not created
    //   everytime, and thus re-render.
    const { api, socket, jsonrpc, types } = state;
    const connect = useCallback(async () => {
        if (api) return;

        const provider = new WsProvider(socket);
        const _api = new ApiPromise({ provider, types, rpc: jsonrpc });

        // We want to listen to event for disconnection and reconnection.
        //  That's why we set for listeners.
        _api.on('connected', () => {
            dispatch({ type: 'CONNECT', payload: _api });

            // `ready` event is not emitted upon reconnection. So we check explicitly here.
            _api.isReady.then((_api) => dispatch({ type: 'CONNECT_SUCCESS' }));
        });
        _api.on('ready', () => {
            dispatch({ type: 'CONNECT_SUCCESS' })
            _api.query.system.events((events) => {
                //console.log(`\nReceived ${events.length} events:`);

                // Loop through the Vec<EventRecord>
                events.forEach((record) => {
                    //console.log('record ', record);
                    // Extract the phase, event and the event types
                    const { event, phase } = record;
                    const types = event.typeDef;
                    if (event.section === 'provotum') {
                        if (event.method === 'PublicKeyShareSubmitted') {
                            //console.log('public key share submitted');
                            event.data.forEach((data, index) => {
                                //console.log(`\t\t\t${types[index].type}: ${data.public_key}`);
                            });
                        }
                        //console.log(`\t\t${event.meta.documentation.toString()}`);
                        // event.data.forEach((data, index) => {
                        //console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
                        //});
                    }
                    // Show what we are busy with
                    // console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);

                    // Loop through each of the parameters, displaying the type and data

                });
            });
        });
        _api.on('error', (err) => dispatch({ type: 'CONNECT_ERROR', payload: err }));
    }, [api, socket, jsonrpc, types, dispatch]);

    // hook to get injected accounts
    const { keyringState } = state;
    const loadAccounts = useCallback(async () => {
        // Ensure the method only run once.
        if (keyringState) return;

        try {
            await web3Enable(config.APP_NAME);
            let allAccounts = await web3Accounts();
            allAccounts = allAccounts.map(({ address, meta }) => ({
                address,
                meta: { ...meta, name: `${meta.name} (${meta.source})` },
            }));

            keyring.loadAll({ isDevelopment: config.DEVELOPMENT_KEYRING }, allAccounts);
            dispatch({ type: 'SET_KEYRING', payload: keyring });
        } catch (e) {
            console.error(e);
            // dispatch({ type: 'KEYRING_ERROR' });
        }
    }, [keyringState, dispatch]);

    useEffect(() => {
        connect();
    }, [connect]);

    useEffect(() => {
        loadAccounts();
    }, [loadAccounts]);

    return { ...state, dispatch };
};

export default useSubstrate;