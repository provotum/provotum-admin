import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, IconButton } from '@material-ui/core';
import { Save, Add, Backspace } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import {
    newVote,
} from '../../features/elections/electionSlice';
import { closeVoteForm } from '../../features/uiBuilder/uiSlice';

export function AddVoteForm(props) {
    let open = props.open;
    // Components should always try to select the smallest possible amount of data they need from the store, which will help ensure that it only renders when it actually needs to.
    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState('');
    const [questionCounter, setQuestionCounter] = useState(0);
    const [status] = useState('pending');

    const vaUrl = process.env.REACT_APP_VA_URL


    const addQuestion = () => {
        let newQuestion = {
            question: question,
            id: questionCounter,
        };
        setQuestions(questions.concat(newQuestion));
        setQuestionCounter(questionCounter + 1);
    };

    const removeQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
    };


    const registeredQuestions = () => {
        return questions.map(q => (
            <div key={q.question} className="registered-question">
                <div className="left">
                    <div className="question">
                        {q.question}
                    </div>
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
        <div className={`add-vote`}>

            <div className="dialog-title title">
                create vote
                <IconButton
                    onClick={() => dispatch(closeVoteForm())}
                    aria-label="settings" color='primary'>
                    <CloseIcon />
                </IconButton>

            </div>

            <form noValidate autoComplete="off">

                <div className="form-row">
                    <TextField className="form-element wide" variant="outlined" label="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="form-row add-question">
                    <TextField className="form-element wide" variant="outlined" label="question" type="text" value={question} onChange={e => setQuestion(e.target.value)} />
                    <IconButton
                        variant="contained"
                        color="primary"
                        size="medium"
                        starticon={<Add />}
                        onClick={() => addQuestion()}
                    >
                        <Add></Add>
                    </IconButton>
                </div>

                <div className="form-row list">
                    {registeredQuestions()}

                </div>

                <div className="form-row">
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        starticon={<Save />}
                        onClick={() => dispatch(newVote({
                            vaUrl: vaUrl,
                            title: title,
                            questions: questions.map(q => q.question)
                        }))}
                    >
                        submit vote
                    </Button>
                </div>
            </form>

        </div >
    )
}