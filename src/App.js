import React, { useEffect, useState } from 'react'
import './App.css';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Dashboard } from './components/Dashboard';
import { SingleVotePage } from './components/SingleVotePage';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useSubstrate } from './substrate';

import { getElections } from './features/elections/electionSlice';
import { checkChain, externalAddresses } from './features/blockchain/chainSlice';
import { restoreAppStates, restoreLayout, newEvent } from './features/uiBuilder/uiSlice';
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
    if (api) {
      console.log('Initializing...');
      console.log(api.query);
      let events = await api.query
      const peerId = await api.rpc.system.localPeerId();
      const networkState = await api.rpc.system.networkState();

      const listenedAddresses = networkState.listenedAddresses.toHuman(true);

      const addresses = networkState.externalAddresses.toHuman(true);
      console.log(peerId);
      console.log(externalAddresses);
      dispatch(externalAddresses(addresses))
    }
    if (api && api.query && api.query.system) {
      api.query.system.events((events) => {
        events.forEach((record) => {
          const { event } = record;
          if (event.section === 'provotum') {
            dispatch(newEvent(event.meta.documentation.toString()));
          }
        });
      });
    }
  }, [dispatch, api]);
  //const { api } = useSubstrate();
  const electionStatus = useSelector(state => state.elections.status);
  useEffect(() => {
    if (electionStatus === 'ready') {
      dispatch(getElections(vaUrl));
    }
  }, [electionStatus, dispatch]);

  useEffect(() => {
    dispatch(restoreLayout());
    dispatch(restoreAppStates());
    dispatch(checkChain(vaUrl));
  }, [dispatch]);



  return (
    <Router>
      <div className="App">

        <header className="App-header">
          <AppBar position="static" >

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

                    <Dashboard />

                  </React.Fragment>
                )}
              />

              <Route
                exact
                path="/elections/:electionId"
                render={() => (
                  <React.Fragment>
                    <SingleVotePage></SingleVotePage>
                  </React.Fragment>
                )}></Route>
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
