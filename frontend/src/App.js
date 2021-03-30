import Home from './components/Home';
import Product from './components/Product';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import SQLInjection from './components/SQLInjection';
import CustomerMember from './components/CustomerMember';
import InsertProduct from './components/InsertProduct';
import PlaceOrder from './components/PlaceOrder';
import EditCustomer from './components/EditCustomer';
import StockManagement from './components/StockManagement'
import OrderManagement from './components/OrderManagement'
import EmployeeManagement from './components/EmployeeManagement'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavigationBar />
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products" exact component={Product} />
            <Route path="/sql" exact component={SQLInjection} />
            <Route path="/customerMember" exact component={CustomerMember} />
            <Route path="/insertProduct" exact component={InsertProduct} />
            <Route path="/PlaceOrder" exact component={PlaceOrder} />
            <Route path="/EditCustomer" exact component={EditCustomer} />
            <Route path="/StockManagement" exact component={StockManagement}></Route>
            <Route path="/OrderManagement" exact component={OrderManagement}></Route>
            <Route path="/EmployeeManagement" exact component={EmployeeManagement}></Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
