import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    GroupWork,
} from "@material-ui/icons";
import { selectElections } from '../../features/elections/electionSlice';
export function NumElections(props) {
    const elections = useSelector(selectElections);

    return (
        <div className={`module simple-module num-elections`}>
            <div className="module-content">
                <div className="module-icon">
                    <GroupWork fontSize="large" color="primary" />
                </div>
                <div className="module-information">
                    <div className="value">{elections.length}</div>
                    <div className="label">Total Votes</div>
                </div>
            </div>

        </div >
    )
}