import React, { Component } from "react"
import { connect } from "react-redux"
import moment from "moment"

import { updateUser, deleteUser } from "../../actions/users"
import { getEventsForUser, deleteEventForUser } from "../../actions/users_events"
import UsersDataService from "../../services/users_db.service"

import { saveAs } from "file-saver"
import * as docx from "docx"

class User extends Component {
  constructor(props) {
    super(props)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeLogin = this.onChangeLogin.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.getUser = this.getUser.bind(this)
    this.fetchUserEvents = this.fetchUserEvents.bind(this)
    this.updateInfo = this.updateInfo.bind(this)
    this.removeUser = this.removeUser.bind(this)
    this.removeEvent = this.removeEvent.bind(this)
    this.saveTicket = this.saveTicket.bind(this)

    this.state = {
      currentUser: {
        id: null,
        login: "",
        password: "",
        name: "",
        email: "",
        phone: ""
      },
      events: null,
      isAdmin: false,
      message: ""
    }
  }

  componentDidMount() {
    const { user, match } = this.props

    const id = match.path.includes("mypage") ? user.id : match.params.id
    this.getUser(id)
    this.fetchUserEvents(id)

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
      })
      .catch((e) => {
        console.log(e)
      })
  }

  updateInfo() {
    this.props
      .updateUser(this.state.currentUser.id, this.state.currentUser)
      .then(() => {
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

    if (!currentUser && isAdmin) return <h5 className="text-center">User is not found.</h5>
    if (!showForm && !isAdmin) return <h5 className="text-center">You don't have enough rights to view this page.</h5>

    return <>
        {this.renderUserInfo()}
        {this.renderTicketsInfo()}
      </>
  }

  renderUserInfo() {
    const { currentUser } = this.state
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

  renderTicketsInfo() {
    const { events } = this.state

    return (
      <>
        <h4>Events List</h4>
        <div className="row">
            <div className="card-deck" style={{ marginTop: "1rem" }}>
              {events &&
                events.map((event, index) => {
                  var className = "col-md-3"
                  if (events.length === 1) {
                    className = "col-md-12"
                  }
                  if (events.length === (2 || 3)) {
                    className = "col-md-6"
                  }
                  
                  return (
                    <div className={className}>
                      <div className="card" style={{ marginBottom: "3rem" }}>
                        <div
                          className="card-body"
                          key={index}
                          >
                          <h5 className="card-title">{event.title}</h5>
                          <p className="card-text">Description: {event.description}</p>
                          <p className="card-text text-muted">Ticket ID: {event.user_event_id}</p>
                          <button type="button" className="btn btn-primary" onClick={() => this.saveTicket(event)}>Download ticket</button>
                          <button type="button" className="btn btn-danger" onClick={() => this.removeEvent(event.user_event_id)} style={{ margin: "0.4rem" }}>Remove</button>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
        </div>
      </>
    )
  }

  fetchUserEvents(id) {
    const { getEventsForUser } = this.props
    getEventsForUser(id)
      .then(events => {
        this.setState({
          events
        })
      })
  }

  removeEvent(userEventId) {
    const { deleteEventForUser, user, match } = this.props

    const id = match.path.includes("mypage") ? user.id : match.params.id

    deleteEventForUser(userEventId)
      .then(() => {
        this.fetchUserEvents(id)
      })
  }

  saveTicket(event) {
    const { currentUser } = this.state

    const doc = new docx.Document({
      sections: [
        {
          properties: {},
          children: [
            new docx.Paragraph({
              text: currentUser.name,
              heading: docx.HeadingLevel.TITLE
            }),
            this.createHeading(`Ticket №${event.user_event_id} created at ${moment().format("LLL")}`),
            this.createSubHeading("Event title"),
            new docx.Paragraph({
              alignment: docx.AlignmentType.LEFT,
              children: [
                new docx.TextRun({
                  text: event.title,
                  bold: true,
                  italics: true
                })
              ]
            }),
            this.createSubHeading("Description:"),
            new docx.Paragraph({
              alignment: docx.AlignmentType.LEFT,
              children: [
                new docx.TextRun({
                  text: event.description,
                  italics: true
                })
              ]
            }),
            this.createSubHeading("Date:"),
            new docx.Paragraph({
              alignment: docx.AlignmentType.LEFT,
              children: [
                new docx.TextRun({
                  text: event.event_date,
                  italics: true
                })
              ]
            }),
            this.createSubHeading("Price:"),
            new docx.Paragraph({
              alignment: docx.AlignmentType.LEFT,
              children: [
                new docx.TextRun({
                  text: event.price,
                  italics: true
                })
              ]
            }),
            this.createSubHeading("Location:"),
            new docx.Paragraph({
              alignment: docx.AlignmentType.LEFT,
              children: [
                new docx.TextRun({
                  text: event.location,
                  italics: true
                })
              ]
            }),
          ]
        }
      ]
    })

    docx.Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Ticket.docx")
    })
  }

  createHeading(text) {
    return new docx.Paragraph({
      text: text,
      heading: docx.HeadingLevel.HEADING_1,
      thematicBreak: true
    });
  }

  createSubHeading(text) {
    return new docx.Paragraph({
      text: text,
      heading: docx.HeadingLevel.HEADING_2
    });
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps, { updateUser, deleteUser, getEventsForUser, deleteEventForUser })(User)
