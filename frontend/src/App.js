import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Home, Product, NavigationBar, SQLInjection, CustomerMember,
  InsertProduct, PlaceOrder, EditCustomer, SaleManagement, EmployeeManagement
} from './PathRoutes'

export class App extends Component {

  constructor() {
    super()

    this.state = {

    }
  }


  render() {
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
              <Route path="/SaleManagement" exact component={SaleManagement}></Route>
              <Route path="/EmployeeManagement" exact component={EmployeeManagement}></Route>
            </Switch>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
