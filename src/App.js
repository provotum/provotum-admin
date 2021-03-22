import React, { useEffect, useState } from 'react'
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
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useSubstrate } from './substrate';

import { getElections } from './features/elections/electionSlice';
import { ChainStatus } from './components/ChainStatus';

const vaUrl = process.env.REACT_APP_VA_URL


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

  const { keyring, keyringState, api } = useSubstrate();

  useEffect(async () => {
    if (api && api.query && api.query.system) {
      console.log('Initializing...');
      console.log(api.query);
      let events = await api.query

    }
  }, [dispatch, api]);
  //const { api } = useSubstrate();
  const electionStatus = useSelector(state => state.elections.status);
  useEffect(() => {
    if (electionStatus === 'ready') {
      dispatch(getElections(vaUrl));
    }
  }, [electionStatus, dispatch]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (state) => {
    setDrawerOpen(state);
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <AppBar position="static" >
            <Toolbar>
              <IconButton
                onClick={() => { toggleDrawer(true) }}
                edge="start"
                className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>

              <Typography variant="h6" className={classes.title}>
                Provotum
    </Typography>
              <Link component={RouterLink} to="/" color="inherit">
                home
    </Link>
              <Link component={RouterLink} to="/chain" color="inherit">
                chain
    </Link>
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
              <Route
                exact
                path="/chain"
                render={() => (
                  <React.Fragment>
                    <CssBaseline />

                    <ChainStatus />

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
    </Router >
  );
}

export default App;
