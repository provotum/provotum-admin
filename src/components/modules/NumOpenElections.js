import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    GroupWork,
} from "@material-ui/icons";
import { selectVotingElections } from '../../features/elections/electionSlice';
export function NumOpenElections(props) {
    const elections = useSelector(selectVotingElections);

    return (
        <div className={`module simple-module num-open-elections`}>
            <div className="module-content">
                <div className="module-icon">
                    <GroupWork fontSize="large" color="primary" />
                </div>
                <div className="module-information">
                    <div className="value">{elections.length}</div>
                    <div className="label">Open Votes</div>
                </div>
            </div>

        </div >
    )
}