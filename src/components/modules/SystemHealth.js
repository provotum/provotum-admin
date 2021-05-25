import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import {
    GroupWork,
} from "@material-ui/icons";
import { selectSealers } from '../../features/blockchain/chainSlice';

export function SystemHealth(props) {
    const sealers = useSelector(selectSealers);
    const [progress, setProgress] = useState(50);
    return (
        <div className={`module simple-module system-health`}>
            <div className="module-content">
                <div className="module-icon">
                    <CircularProgress variant="determinate" value={progress} />
                </div>
                <div className="module-information">
                    <div className="value">{'medium'}</div>
                    <div className="label">System Health</div>
                </div>

            </div>

        </div >
    )
}