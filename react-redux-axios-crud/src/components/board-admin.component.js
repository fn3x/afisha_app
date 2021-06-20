import React, { Component } from "react"

import { Link } from "react-router-dom"

export default class BoardAdmin extends Component {
  render() {
    return (
      <div className="container">
        <div className="cards" style={{ display: 'flex', gap: '2rem', justifyContent: 'center'}}>
          <div className="card" style={{ width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">Events list</h5>
              <p className="card-text">Here you can add, change and delete events</p>
              <Link to={"/eventslist"}>
                <div className="btn btn-primary">View events</div>
              </Link>
            </div>
          </div>
          
          <div className="card" style={{ width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">Users list</h5>
              <p className="card-text">Here you can add, change and delete users</p>
              <Link to={"/userslist"}>
                <div className="btn btn-primary">View users</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}