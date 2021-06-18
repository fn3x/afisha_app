import React, { Component } from "react"
import { connect } from "react-redux"
import {
  retrieveUsers,
  deleteAllUsers,
  findByLogin
} from "../../actions/users"
import { Link } from "react-router-dom"

class UsersList extends Component {
  constructor(props) {
    super(props)
    this.onChangeSearchLogin = this.onChangeSearchLogin.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.setActiveUser = this.setActiveUser.bind(this)
    this.findByLogin = this.findByLogin.bind(this)
    this.removeAllUsers = this.removeAllUsers.bind(this)

    this.state = {
      currentUser: null,
      currentIndex: -1,
      searchLogin: "",
    }
  }

  componentDidMount() {
    this.props.retrieveUsers()
  }

  onChangeSearchLogin(e) {
    const searchLogin = e.target.value

    this.setState({
      searchLogin: searchLogin,
    })
  }

  refreshData() {
    this.setState({
      currentUser: null,
      currentIndex: -1,
    })
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index,
    })
  }

  removeAllUsers() {
    this.props
      .deleteAllUsers()
      .then((response) => {
        console.log(response)
        this.refreshData()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  findByLogin() {
    this.props
      .findByLogin(this.state.searchLogin)
      .then((response) => {
        console.log(response)
        this.refreshData()
      })
      .catch((e) => {
        console.log(e)
      })

    this.refreshData()
  }

  render() {
    const { searchLogin, currentUser, currentIndex } = this.state
    const { users } = this.props

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by login"
              value={searchLogin}
              onChange={this.onChangeSearchLogin}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByLogin}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users List</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllUsers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentUser.name}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentUser.email}
              </div>
              <div>
                <label>
                  <strong>Phone:</strong>
                </label>{" "}
                {currentUser.phone}
              </div>
              <div>
                <label>
                  <strong>Admin:</strong>
                </label>{" "}
                {currentUser.is_admin ? "Yes" : "No"}
              </div>

              <Link
                to={"/users/" + currentUser.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a user...</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

export default connect(mapStateToProps, {
  retrieveUsers,
  deleteAllUsers,
  findByLogin
})(UsersList)
