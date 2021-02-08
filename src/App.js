import React from 'react'
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
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <body>
          <div className="content">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <React.Fragment>
                    <VoteList />
                    <AddVoteForm />
                  </React.Fragment>
                )}
              />
              <Route exact path="/votes/:voteId" component={SingleVotePage} />
              <Redirect to="/" />
            </Switch>

          </div>
        </body>
        <footer>

        </footer>
      </div>
    </Router>
  );
}

export default App;
