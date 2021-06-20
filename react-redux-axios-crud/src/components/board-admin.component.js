import React, { Component } from "react"

import UserService from "../services/user.service"
import { Link } from "react-router-dom"

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: ""
    }
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>

        <div class="cards" style={{ display: 'flex', gap: '2rem', justifyContent: 'center'}}>
          <div className="card" style={{ width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">Add event</h5>
              <p className="card-text">Create event</p>
              <Link to={"/eventslist"}>
                <a className="btn btn-primary">Create</a>
              </Link>
            </div>
          </div>
          
          <div className="card" style={{ width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">Users list</h5>
              <p className="card-text">View users list. Here you can add, change and delete</p>
              <Link to={"/userslist"}>
                <a className="btn btn-primary">View</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}