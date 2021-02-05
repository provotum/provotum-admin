import logo from './logo.svg';
import './App.css';
import { Counter } from './components/counter';
import { VoteList } from './components/voteList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <VoteList />
      </header>
    </div>
  );
}

export default App;
