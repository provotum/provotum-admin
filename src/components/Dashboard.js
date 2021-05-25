import React, { useState } from 'react';
import { ChainStatus } from './modules/ChainStatus';
import { LivePeers } from './modules/LivePeers';
import { NumElections } from './modules/NumElections';
import { NumOpenElections } from './modules/NumOpenElections';
import { SealerStatus } from './modules/SealerStatus';
import { SystemHealth } from './modules/SystemHealth';
import { VoteList } from './modules/VoteList';
import { VoterParticipation } from './modules/VoterParticipation';
import { selectChain } from './../features/blockchain/chainSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AddVoteForm } from './dialogues/addVoteForm';
import { VoteDetail } from './dialogues/voteDetail';
import { selectAddVoteFormOpen, selectAppStates, selectLayout, selectSelectedElection, selectVoteDetailOpen, storeLayout } from '../features/uiBuilder/uiSlice';
import GridLayout from 'react-grid-layout';
import { ModuleSelector } from './dialogues/moduleSelector';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import { PanTool } from '@material-ui/icons';
import { ChainLogs } from './modules/ChainLogs';
export function Dashboard() {
    const dispatch = useDispatch();
    const chain = useSelector(selectChain);
    const addVoteFormOpen = useSelector(selectAddVoteFormOpen);
    const voteDetailOpen = useSelector(selectVoteDetailOpen);
    const [moduleSelectorOpen, setmoduleSelectorOpen] = useState(false);
    const [dragMode, setdragMode] = useState(false);

    const selectedElection = useSelector(selectSelectedElection);

    const toggleModuleSelector = () => {
        setmoduleSelectorOpen(!moduleSelectorOpen);
    }

    const toggleDragMode = () => {
        setdragMode(!dragMode);
    }

    const layout = useSelector(selectLayout);
    const appstates = useSelector(selectAppStates);

    const saveLayout = (layout) => {
        dispatch(storeLayout(layout))
    }


    const components = {
        'NumOpenElections': NumOpenElections,
        //'Actions': Actions,
        'NumElections': NumElections,
        'LivePeers': LivePeers,
        'VoterParticipation': VoterParticipation,
        'SystemHealth': SystemHealth,
        'SealerStatus': SealerStatus,
        'VoteList': VoteList,
        'ChainStatus': ChainStatus,
        'LiveLogs': ChainLogs
    }

    const renderApps = appstates.filter(app => app.active).map(app => {
        const Comp = components[app.i];
        return <div key={app.i}><Comp /></div>
    })


    return (

        <div className={`dashboard ${addVoteFormOpen ? 'dialog-open' : ''}`}>
            {layout.length > 0 && appstates.length > 0 && (
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={6}
                    rowHeight={80}
                    isDraggable={dragMode}
                    isResizable={dragMode}
                    width={1200}
                    resizeHandles={['se']}
                    onLayoutChange={(layout) => saveLayout(layout)}
                >
                    {renderApps}

                </GridLayout>
            )}
            <div
                onClick={() => { toggleModuleSelector() }}
                className={`module-selector-button ${moduleSelectorOpen ? 'active' : ''}`}>
                <IconButton aria-label="settings" color={moduleSelectorOpen ? 'primary' : 'default'}>
                    <SettingsIcon />
                </IconButton>
            </div>
            <div
                onClick={() => { toggleDragMode() }}
                className={`drag-mode-button ${moduleSelectorOpen ? 'active' : ''}`}>
                <IconButton aria-label="settings" color={dragMode ? 'primary' : 'default'}>
                    <PanTool />
                </IconButton>
            </div>
            {(<ModuleSelector open={moduleSelectorOpen}></ModuleSelector>)}
        </div>
    )
}