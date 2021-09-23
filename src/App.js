import logo from './logo.svg';
import './App.css';
import GameComponent from "./game"
import {Row,Col,Container,Table} from 'react-bootstrap'
import  Results  from './results';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Row lg="12">
      <GameComponent />
      <Results />
      </Row>
      </header>
    </div>
  );
}

export default App;
