import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Chip, IconButton, Divider } from '@material-ui/core';
import { Save, Add, Backspace } from '@material-ui/icons';

import {
    newVote,
} from '../features/elections/electionSlice';

export function AddVoteForm() {
    // Components should always try to select the smallest possible amount of data they need from the store, which will help ensure that it only renders when it actually needs to.
    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState('');
    const [questionCounter, setQuestionCounter] = useState(0);
    const [answerTrue, setAnswerTrue] = useState('');
    const [answerFalse, setAnswerFalse] = useState('');
    const [status] = useState('pending');

    const vaUrl = process.env.REACT_APP_VA_URL


    const addQuestion = () => {
        let newQuestion = {
            question: question,
            answerTrue: answerTrue,
            answerFalse: answerFalse,
            id: questionCounter,
        };
        setQuestions(questions.concat(newQuestion));
        setQuestionCounter(questionCounter + 1);
    };

    const removeQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const buildElection = () => {
        return {
            id,
            title,
            description,
            questions,
            status,
        }
    };

    const registeredQuestions = () => {
        return questions.map(q => (
            <div key={q.question} className="registered-question">
                <div className="left">
                    <div className="question">
                        {q.question}
                    </div>
                    <Chip className="registered-answer" color="primary" label={q.answerTrue} />
                    <Chip className="registered-answer" color="secondary" label={q.answerFalse} />
                </div>
                <div className="right">
                    <IconButton
                        onClick={() => removeQuestion(q.id)}
                        color="secondary" aria-label="add an alarm">
                        <Backspace />
                    </IconButton>
                </div>


            </div>
        ));
    };

    return (
        <div>
            <h2>add vote</h2>

            <form noValidate autoComplete="off">

                <div className="form-row">
                    <TextField className="form-element" variant="outlined" label="id" type="text" value={id} onChange={e => setId(e.target.value)} />
                    <TextField className="form-element wide" variant="outlined" label="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </div>

                <div className="form-row">
                    <TextField className="form-element wide" variant="outlined" multiline rows={4} label="description" type="text" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <Divider />
                <div className="form-row list">
                    {registeredQuestions()}

                </div>
                <Divider />

                <div className="form-row">
                    <TextField className="form-element wide" variant="outlined" label="question" type="text" value={question} onChange={e => setQuestion(e.target.value)} />
                </div>
                <div className="form-row">
                    <TextField className="form-element" variant="outlined" label="answer true" type="text" value={answerTrue} onChange={e => setAnswerTrue(e.target.value)} />
                    <TextField className="form-element" variant="outlined" label="answer false" type="text" value={answerFalse} onChange={e => setAnswerFalse(e.target.value)} />

                </div>
                <div className="form-row">
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        startIcon={<Add />}
                        onClick={() => addQuestion()}
                    >
                        add question
                    </Button>
                </div>
                <Divider />

                <div className="form-row">
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        startIcon={<Save />}
                        onClick={() => dispatch(newVote(vaUrl))}
                    >
                        submit vote
        </Button>
                </div>
            </form>

        </div>
    )
}