import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addVote,
} from './../redux/votesSlice';

export function AddVoteForm() {
    // Components should always try to select the smallest possible amount of data they need from the store, which will help ensure that it only renders when it actually needs to.
    const dispatch = useDispatch();
    const [id, setId] = useState('id');
    const [title, setTitle] = useState('title');
    const [description, setDescription] = useState('description');
    const [question, setQuestion] = useState('some question');
    const [answerTrue, setAnswerTrue] = useState('yes');
    const [answerFalse, setAnswerFalse] = useState('no');
    const [status, setStatus] = useState('pending');

    const buildVote = () => {
        return {
            id,
            title,
            description,
            questions: [
                {
                    'question': question,
                    'answerTrue': answerTrue,
                    'answerFalse': answerFalse,
                }
            ],
            status,
        }
    };

    return (
        <div>
            <h2>add vote</h2>

            <div className="form">
                <input type="text" value={id} onChange={e => setId(e.target.value)} />
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                <input type="text" value={question} onChange={e => setQuestion(e.target.value)} />
                <input type="text" value={answerTrue} onChange={e => setAnswerTrue(e.target.value)} />
                <input type="text" value={answerFalse} onChange={e => setAnswerFalse(e.target.value)} />

            </div>

            <button onClick={() => dispatch(addVote(buildVote()))}>add vote</button>
        </div>
    )
}