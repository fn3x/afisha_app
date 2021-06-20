import React, { Component } from "react"
import { connect } from "react-redux"
import { updateUser, deleteUser } from "../../actions/users"
import UsersDataService from "../../services/users_db.service"

class User extends Component {
  constructor(props) {
    super(props)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeLogin = this.onChangeLogin.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.getUser = this.getUser.bind(this)
    this.updateInfo = this.updateInfo.bind(this)
    this.removeUser = this.removeUser.bind(this)

    this.state = {
      currentUser: {
        id: null,
        login: "",
        password: "",
        name: "",
        email: "",
        phone: ""
      },
      isAdmin: false,
      message: ""
    }
  }

  componentDidMount() {
    const { user } = this.props

    this.getUser(this.props.match.params.id)

    if (user) {
      this.setState({
        isAdmin: user.roles.includes("ROLE_ADMIN")
      })
    }
  }

  onChangeName(e) {
    const name = e.target.value

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          name: name,
        },
      }
    })
  }

  onChangeEmail(e) {
    const email = e.target.value

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        email: email,
      },
    }))
  }

  onChangeLogin(e) {
    const login = e.target.value

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        login: login,
      },
    }))
  }

  onChangePassword(e) {
    const password = e.target.value

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        password: password,
      },
    }))
  }

  getUser(id) {
    UsersDataService.get(id)
      .then((response) => {
        this.setState({
          currentUser: response.data,
        })
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  updateInfo() {
    this.props
      .updateUser(this.state.currentUser.id, this.state.currentUser)
      .then((reponse) => {
        console.log(reponse)
        
        this.setState({ message: "The user was updated successfully!" })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  removeUser() {
    this.props
      .deleteUser(this.state.currentUser.id)
      .then(() => {
        this.props.history.push("/userslist")
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
    const { currentUser, isAdmin } = this.state
    const { user } = this.props

    const showForm = currentUser.id === user.id

    if (!currentUser && isAdmin) return <h5>User is not found.</h5>
    if (!showForm && !isAdmin) return <h5>You don't have enough rights to view this page.</h5>

    const content = this.getUserInfo(currentUser)

    return content
  }

  getUserInfo(currentUser) {
    return (
      <div className="edit-form">
        <h4>User</h4>
        <form>
          <div className="form-group">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={currentUser.name}
              onChange={this.onChangeName} />
          </div>
          <div className="form-group">
            <label htmlFor="login">Login</label>
            <input
              type="text"
              className="form-control"
              id="login"
              value={currentUser.login}
              onChange={this.onChangeLogin} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              value={currentUser.password}
              onChange={this.onChangePassword} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={currentUser.email}
              onChange={this.onChangeEmail} />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              value={currentUser.phone}
              onChange={this.onChangeEmail} />
          </div>
        </form>

        <button
          className="badge badge-danger mr-2"
          onClick={this.removeUser}
        >
          Delete
        </button>

        <button
          type="submit"
          className="badge badge-success"
          onClick={this.updateInfo}
        >
          Update
        </button>
        <p>{this.state.message}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps, { updateUser, deleteUser })(User)
