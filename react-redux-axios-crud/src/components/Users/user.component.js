import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser, deleteUser } from "../../actions/users";
import UsersDataService from "../../services/users.service";

class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateAdminStatus = this.updateAdminStatus.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.removeUser = this.removeUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        name: "",
        email: "",
        phone: "",
        is_admin: false,
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          name: name,
        },
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        email: email,
      },
    }));
  }

  getUser(id) {
    UsersDataService.get(id)
      .then((response) => {
        this.setState({
          currentUser: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateAdminStatus(status) {
    var data = {
      id: this.state.currentUser.id,
      email: this.state.currentUser.email,
      phone: this.state.currentUser.phone,
      is_admin: status,
    };

    this.props
      .updateUser(this.state.currentUser.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentUser: {
            ...prevState.currentUser,
            is_admin: status,
          },
        }));

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateInfo() {
    this.props
      .updateUser(this.state.currentUser.id, this.state.currentUser)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The user was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeUser() {
    this.props
      .deleteUser(this.state.currentUser.id)
      .then(() => {
        this.props.history.push("/users");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
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
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentUser.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentUser.phone}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Admin status:</strong>
                </label>
                {currentUser.is_admin ? " Yes" : " No"}
              </div>
            </form>

            {currentUser.is_admin ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateAdminStatus(false)}
              >
                Remove admin rights
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateAdminStatus(true)}
              >
                Grant admin rights
              </button>
            )}

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
        ) : (
          <div>
            <br />
            <p>Please click on a user...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateUser, deleteUser })(User);
