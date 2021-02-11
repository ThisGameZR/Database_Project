import Home from './components/Home';
import Product from './components/Product';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/product" exact component={Product}/>
          </Switch>
        </Router>   
       
      </header>
    </div>
  );
}

export default App;
