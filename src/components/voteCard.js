import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';

import { Link } from 'react-router-dom'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { LockOpen, Lock, Pause } from '@material-ui/icons';

import { useState } from 'react';

export function VoteCard(props) {
    let vote = props.vote;
    const [expanded, setExpanded] = useState(false);




    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const icon = (vote) => {
        switch (vote.status) {
            case 'pending':
                return <Pause />
            case 'open':
                return <LockOpen />
            case 'closed':
                return <Lock />
            default:
                return <Lock />
        }
    };

    const voteQuestions = (vote) => {
        return vote.questions.map(q => (

            <div key={vote.id + q.question}>
                <Typography paragraph>{q.question}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {q.answerTrue}, {q.answerFalse}
                </Typography>
            </div>
        ));
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar className="bg-accent" >
                        {icon(vote)}
                    </Avatar>
                }
                title={vote.title}
                subheader={vote.createdOn}>

            </CardHeader>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {vote.description}
                </Typography>

            </CardContent>
            <CardActions>
                <Button>
                    edit
                </Button>
                <Link to={`/votes/${vote.id}`} className="button muted-button">
                    View Vote
      </Link>
                <IconButton

                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {voteQuestions(vote)}
                </CardContent>
            </Collapse>
        </Card>
    )
}