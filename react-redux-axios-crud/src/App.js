import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import AddUser from "./components/Users/add-user.component"
import User from "./components/Users/user.component"
import UsersList from "./components/Users/users-list.component"

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Afisha
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users list
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/events"} className="nav-link">
                Events list
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/users/add"} className="nav-link">
                Add user
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/events/add"} className="nav-link">
                Add event
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/users" component={UsersList} />
            <Route exact path="/events" component={UsersList} />
            <Route exact path="/users/add" component={AddUser} />
            <Route exact path="/events/add" component={AddUser} />
            <Route path="/users/:id" component={User} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
