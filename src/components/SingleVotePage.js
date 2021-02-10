import { Typography, Chip } from '@material-ui/core';
import { HowToVote, ThumbDown, ThumbUp } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';

export function SingleVotePage({ match }) {
    const { voteId } = match.params;
    const vote = useSelector(state =>
        state.votes.votes.find(vote => vote.id === voteId));
    //const dispatch = useDispatch();

    const voteQuestions = (vote) => {
        return vote.questions.map(q => (
            <div key={vote.toString()} className="question-entry">
                <div className="question">
                    <HowToVote />
                    {q.question}
                </div>
                <div className="answers">
                    <Chip
                        icon={<ThumbUp />}
                        label={q.answerTrue}
                        color="primary"></Chip>
                    <Chip
                        icon={<ThumbDown />}
                        label={q.answerFalse}
                        color="secondary"></Chip>

                </div>

            </div>
        ));
    }


    return (
        <div>
            <Typography variant="h2">{vote.title}</Typography>
            <Typography variant="body1">{vote.description}</Typography>
            <Typography variant="h3">Questions</Typography>
            <div className="question-list">
                {voteQuestions(vote)}
            </div>
        </div>
    )
}