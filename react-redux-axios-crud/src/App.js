import React, { Component } from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import AddUser from "./components/Users/add-user.component"
import User from "./components/Users/user.component"
import UsersList from "./components/Users/users-list.component"
import AddEvent from "./components/Events/add-event.component"
import Event from "./components/Events/event.component"
import EventsList from './components/Events/events-list.component'

import Login from "./components/Auth/login.component"
import Register from "./components/Auth/register.component"
import Profile from "./components/Auth/profile.component"
import BoardUser from "./components/board-user.component"
import BoardAdmin from "./components/board-admin.component"

import { logout } from "./actions/auth"
import { clearMessage } from "./actions/messages"

import { history } from './helpers/history'

class App extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()) // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      })
    }
  }

  logOut() {
    this.props.dispatch(logout())
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state

    return (
      <Router history={history}>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Afisha
          </Link>
          <div className="navbar-nav mr-auto">
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/mypage"} className="nav-link">
                  My account
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={EventsList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/mypage" component={User} />
            <Route path="/eventslist" component={EventsList} />
            <Route path="/userslist" component={UsersList} />
            <Route exact path="/users/add" component={AddUser} />
            <Route exact path="/events/add" component={AddEvent} />
            <Route path="/users/:id" component={User} />
            <Route path="/events/:id" component={Event} />
          </Switch>
        </div>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
