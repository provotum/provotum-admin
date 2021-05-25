import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAppStates, storeAppStates, toggleAppState } from '../../features/uiBuilder/uiSlice';
import Switch from '@material-ui/core/Switch';
import CloseIcon from '@material-ui/icons/Close';


export function ModuleSelector(props) {
    let open = props.open;
    const dispatch = useDispatch();

    const states = useSelector(selectAppStates);

    const saveStates = (states) => {
        dispatch(storeAppStates(states))
    }
    const toggleModule = (id) => {
        console.log('toggling module', id);
        dispatch(toggleAppState(id))
    }


    const renderedSwitches = states.filter(m => m.optional).map(module => (
        <div key={module.i} className="module-switch">
            <div className="switch-label">{module.name}</div>
            <Switch
                checked={module.active}
                onChange={() => { toggleModule(module.i) }}
                name={module.i}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            /></div>
    ));



    return (
        <div className={`dialog side module-selector ${open ? 'open' : ''}`}>
            <div className="dialog-title">
                manage modules
            </div>
            {states.length > 0 && renderedSwitches}
        </div >
    )
}