import React, { Component } from "react"
import { connect } from "react-redux"

import EventsDataService from "../../services/events_db.service"
import { updateEvent } from "../../actions/events"

class ChangeEvent extends Component {
  constructor(props) {
    super(props)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeEventDate = this.onChangeEventDate.bind(this)
    this.onChangePrice = this.onChangePrice.bind(this)
    this.onChangeAvailableTickets = this.onChangeAvailableTickets.bind(this)
    this.onChangeSchemeURL = this.onChangeSchemeURL.bind(this)
    this.onChangeLocation = this.onChangeLocation.bind(this)
    this.saveEvent = this.saveEvent.bind(this)

    this.state = {
      currentEvent: {
        id: null,
        title: "",
        description: "",
        eventDate: undefined,
        price: 0.00,
        available_tickets: 0,
        scheme_url: "",
        location: ""
      },
      submitted: false,
      isAdmin: false
    }
  }

  componentDidMount() {
    const { user } = this.props

    this.getEvent(this.props.match.params.id)

    if (user) {
      console.log(user.roles.includes("ROLE_ADMIN"))
      this.setState({
        isAdmin: user.roles.includes("ROLE_ADMIN")
      })
    }
  }

  onChangeTitle(e) {
    const title = e.target.value

    this.setState((prevState) => ({
      currentEvent: {
        ...prevState.currentEvent,
        title,
      },
    }))
  }

  onChangeDescription(e) {
    const description = e.target.value

    this.setState((prevState) => ({
      currentEvent: {
        ...prevState.currentEvent,
        description,
      },
    }))
  }

  onChangeEventDate(e) {
    const eventDate = e.target.value

    this.setState((prevState) => ({
      currentEvent: {
        ...prevState.currentEvent,
        event_date: eventDate,
      },
    }))
  }

  onChangePrice(e) {
    const price = e.target.value

    this.setState((prevState) => ({
      currentEvent: {
        ...prevState.currentEvent,
        price,
      },
    }))
  }

  onChangeAvailableTickets(e) {
    const available_tickets = e.target.value

    this.setState((prevState) => ({
      currentEvent: {
        ...prevState.currentEvent,
        available_tickets,
      },
    }))
  }

  onChangeSchemeURL(e) {
    const scheme_url = e.target.value

    this.setState((prevState) => ({
      currentEvent: {
        ...prevState.currentEvent,
        scheme_url,
      },
    }))
  }

  onChangeLocation(e) {
    const location = e.target.value

    this.setState((prevState) => ({
      currentEvent: {
        ...prevState.currentEvent,
        location,
      },
    }))
  }

  saveEvent() {
    const { currentEvent } = this.state

    const { updateEvent } = this.props

    updateEvent(currentEvent)
      .then((response) => {
        this.setState({
          currentEvent: response,
          submitted: true
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  newEvent() {
    this.setState({
      title: "",
      description: "",
      eventDate: "",
      price: 0,
      available_tickets: 0,
      scheme_url: "",
      location: "",

      submitted: false
    })
  }

  getEvent(id) {
    EventsDataService.get(id)
      .then((response) => {
        this.setState({
          currentEvent: response.data
        })
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
    const {
      currentEvent: {
        title,
        description,
        eventDate,
        price,
        available_tickets,
        scheme_url,
        location
      },
      isAdmin
    } = this.state

    if (!isAdmin) return <h5 className="text-center">You don't have enough rights to view this page.</h5>

    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newEvent}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group datepicker" inline="true">
              <label htmlFor="eventDate">Event Date</label>
              <input
                placeholder="Select date"
                type="date"
                className="form-control"
                id="eventDate"
                min={(new Date()).toISOString().split('T')[0]}
                required
                value={eventDate}
                onChange={this.onChangeEventDate}
                name="eventDate"
              />
              <i className="fas fa-calendar input-prefix"></i>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                required
                value={price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div>

            <div className="form-group">
              <label htmlFor="available_tickets">Available tickets</label>
              <input
                type="text"
                className="form-control"
                id="available_tickets"
                required
                value={available_tickets}
                onChange={this.onChangeAvailableTickets}
                name="available_tickets"
              />
            </div>

            <div className="form-group">
              <label htmlFor="scheme_url">Scheme URL</label>
              <input
                type="text"
                className="form-control"
                id="scheme_url"
                required
                value={scheme_url}
                onChange={this.onChangeSchemeURL}
                name="scheme_url"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                required
                value={location}
                onChange={this.onChangeLocation}
                name="location"
              />
            </div>

            <button onClick={this.saveEvent} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
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

export default connect(mapStateToProps, { updateEvent })(ChangeEvent)