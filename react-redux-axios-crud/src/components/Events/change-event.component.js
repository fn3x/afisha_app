import React, { Component } from "react"
import { connect } from "react-redux"
import moment from 'moment'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Link } from "react-router-dom"

import EventsDataService from "../../services/events_db.service"
import { createEvent, updateEvent } from "../../actions/events"

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
        event_date: undefined,
        price: 0.00,
        available_tickets: 0,
        scheme_url: "",
        location: ""
      },
      shouldUpdate: false,
      submitted: false,
      isAdmin: false
    }
  }

  componentDidMount() {
    const { user, match } = this.props

    if (match.path.includes("change")) {
      this.getEvent(this.props.match.params.id)

      this.setState({
        shouldUpdate: true
      })
    }

    if (user) {
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

  onChangeEventDate(date) {
    this.setState((prevState) => ({
      currentEvent: {
        ...prevState.currentEvent,
        event_date: date,
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
    const { currentEvent, shouldUpdate } = this.state
    const { createEvent, updateEvent } = this.props

    const eventObj = { ...currentEvent, event_date: moment(currentEvent.event_date).toDate() }

    if (shouldUpdate) {
      return updateEvent(eventObj)
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

    return createEvent(eventObj)
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

  getEvent(id) {
    EventsDataService.get(id)
      .then((response) => {
        this.setState({
          currentEvent: response.data
        })
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
        event_date,
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
          <>
            <h4>You submitted successfully!</h4>
            <div className="row d-flex justify-content-center align-items-center">
              <Link to={"/eventslist"} className="btn btn-primary" style={{ marginRight: "0.3rem" }}>
                To events list
              </Link>
              <Link to={"/mypage"} className="btn btn-success" style={{ marginLeft: "0.3rem" }}>
                To my account
              </Link>
            </div>
          </>
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
              <label htmlFor="event_date">Event Date</label>
              <p>
                <DatePicker
                      className="form-control"
                      selected={moment.parseZone(event_date).toDate()}
                      onChange={this.onChangeEventDate}
                      minDate={moment().toDate()}
                      name="selectDate"
                      showTimeSelect
                      timeIntervals={30}
                      timeFormat="HH:mm"
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                  />
              </p>
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

export default connect(mapStateToProps, { createEvent, updateEvent })(ChangeEvent)
