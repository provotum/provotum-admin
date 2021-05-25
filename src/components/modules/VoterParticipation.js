import { Typography, Button, Card, CardContent } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from '@reactchartjs/react-chart.js'

import { selectElections } from '../../features/elections/electionSlice';
export function VoterParticipation() {

    const elections = useSelector(selectElections);

    const pastElections = () => {
        return elections.filter(e => e.results.length > 0);
    }

    const options = {
        scales: {
            yAxes: [
                {
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
            xAxes: [
                {
                    stacked: true,
                },
            ],
        },
    }

    const chartData = () => {
        let data = {
            labels: [],
            datasets: [
                {
                    label: '#no',
                    data: [],
                    backgroundColor: 'rgb(255, 99, 132)',
                },
                {
                    label: '#yes',
                    data: [],
                    backgroundColor: 'rgb(75, 192, 192)',
                },
            ],
        };
        console.log(pastElections());
        pastElections().forEach(e => {
            let subjects = e.subjects;
            subjects.forEach(s => {
                data.labels.push(s[1][0]);
                let res = e.results.find(r => r.subject_id === s[0]);
                let numYes = res.yes;
                let numNo = res.no;
                data.datasets[0].data.push(Number(numNo.replaceAll(',', '')));
                data.datasets[1].data.push(Number(numYes.replaceAll(',', '')));
            })
        });
        return data;
    }

    return (
        <div className={`module voter-participation`}>
            <div className="module-title">
                Voter Participation
            </div>
            <div className="module-content">
                <Bar data={chartData} options={options} />

            </div>


        </div >
    )
}