import React from 'react';
import { useSelector } from 'react-redux';

export function SingleVotePage({ match }) {
    const { voteId } = match.params;
    const vote = useSelector(state =>
        state.votes.votes.find(vote => vote.id === voteId));
    //const dispatch = useDispatch();

    const voteQuestions = (vote) => {
        return vote.questions.map(q => (
            <div key={vote.toString()}>
                {q.question}
                <button>{q.answerTrue}</button>
                <button>{q.answerFalse}</button>
            </div>
        ));
    }


    return (
        <div>
            <h2>{vote.title}</h2>
            {voteQuestions(vote)}
        </div>
    )
}