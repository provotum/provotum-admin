import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    GroupWork,
} from "@material-ui/icons";
import { selectSealers } from '../../features/blockchain/chainSlice';
export function SealerStatus(props) {
    const sealers = useSelector(selectSealers);

    return (
        <div className={`module simple-module sealer-status`}>
            <div className="module-content">
                <div className="module-icon">
                    <GroupWork fontSize="large" color="primary" />
                </div>
                <div className="module-information">
                    <div className="value">{sealers.length}</div>
                    <div className="label">Total Sealers</div>
                </div>
            </div>

        </div >
    )
}