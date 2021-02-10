import React, { useEffect } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { VoteList } from './components/voteList';
import { AddVoteForm } from './components/addVoteForm';
import { SingleVotePage } from './components/SingleVotePage';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useSubstrate } from './substrate';

import { getElections } from './redux/electionSlice';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { api } = useSubstrate();
  const electionStatus = useSelector(state => state.elections.status);
  useEffect(() => {
    if (electionStatus === 'ready' && api) {
      dispatch(getElections(api));
    }
  }, [electionStatus, dispatch, api]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <AppBar position="static" >
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Provotum
    </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </header>
        <div className="body">
          <div className="content">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <React.Fragment>
                    <CssBaseline />

                    <VoteList />
                    <AddVoteForm />

                  </React.Fragment>
                )}
              />
              <Route exact path="/votes/:voteId" component={SingleVotePage} />
              <Redirect to="/" />
            </Switch>

          </div>
        </div>
        <footer>

        </footer>
      </div>
    </Router>
  );
}

export default App;
