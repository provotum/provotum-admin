import { Button, Card, CardActions, CardContent, CardHeader, Typography, Collapse, IconButton, Avatar } from '@material-ui/core';
import { Lock, HourglassEmpty, HowToVote, GroupWork, ExpandMore } from '@material-ui/icons';

import { Link } from 'react-router-dom'
import { useState } from 'react';

export function ElectionCard(props) {
    let election = props.election;
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const icon = (election) => {
        switch (election.phase) {
            case 'Tallying':
                return <HourglassEmpty />
            case 'Voting':
                return <HowToVote />
            case 'DistributedKeyGeneration':
                return <GroupWork />
            default:
                return <Lock />
        }
    };

    const electionSubjects = (election) => {
        return election.subjects.map(s => (

            <div key={election.electionId + s[0]}>
                <Typography paragraph>{s[1]}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {'Yes'}, {'No'}
                </Typography>
            </div>
        ));
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar className="bg-accent" >
                        {icon(election)}
                    </Avatar>
                }
                title={election.title}
                subheader={election.createdOn}>

            </CardHeader>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {election.description}
                </Typography>

            </CardContent>
            <CardActions>
                <Button>
                    edit
                </Button>
                <Link to={`/elections/${election.id}`} className="button muted-button">
                    View election
      </Link>
                <IconButton

                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMore />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {electionSubjects(election)}
                </CardContent>
            </Collapse>
        </Card>
    )
}