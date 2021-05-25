import React, { useEffect, useState } from 'react'
import { useSubstrate } from '../../substrate';
import { useSelector } from 'react-redux';
import { selectEvents } from '../../features/uiBuilder/uiSlice';

export function ChainLogs(props) {

    const events = useSelector(selectEvents);

    const renderEvents = events.map((e, index) => {
        return (
            <div className='event' key={index}>
                <div className="time">{e.time}</div>
                <div className="name">{e.message}</div>
            </div>
        )
    })

    return (
        <div className={`module logs`}>
            <div className="module-title">
                Logs
            </div>
            <div className="module-content">
                <div className="event-list">
                    {renderEvents}
                </div>
            </div>

        </div >
    )
}