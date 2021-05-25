import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';

import { selectSealers, selectPeers } from '../../features/blockchain/chainSlice';
export function LivePeers(props) {
    const peers = useSelector(selectPeers);
    const sealers = useSelector(selectSealers);

    //const [progress, setProgress] = useState(50);
    return (
        <div className={`module simple-module live-peers`}>
            <div className="module-content">
                <div className="module-icon">
                    {sealers.length > 0 && (
                        <CircularProgress variant="determinate" value={peers.length / sealers.length * 100} />

                    )}
                </div>
                <div className="module-information">
                    <div className="value">{peers.length} / {sealers.length}</div>
                    <div className="label">Live Peers</div>
                </div>

            </div>

        </div >
    )
}