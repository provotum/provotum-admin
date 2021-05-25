import React, { useState, } from 'react';
import { useDispatch } from 'react-redux';
import { openVoteForm } from './../../features/uiBuilder/uiSlice';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
export function Actions(props) {

    const dispatch = useDispatch();



    return (
        <div className={`module actions`}>
            <div className="module-title">
                Actions
            </div>
            <div className="module-content">
                <div className="action-list">

                </div>

            </div>

        </div >
    )
}