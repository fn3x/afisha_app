import React, { Component } from "react"
import { connect } from "react-redux"
import { createEvent } from "../../actions/events"

class AddEvent extends Component {
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
    this.newEvent = this.newEvent.bind(this)

    this.state = {
      id: null,
      title: "",
      description: "",
      eventDate: new Date(),
      price: 0.00,
      available_tickets: 0,
      scheme_url: "",
      location: "",

      submitted: false
    }
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    })
  }

  onChangeEventDate(e) {
    this.setState({
      eventDate: e.target.value,
    })
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    })
  }

  onChangeAvailableTickets(e) {
    this.setState({
      available_tickets: e.target.value,
    })
  }

  onChangeSchemeURL(e) {
    this.setState({
      scheme_url: e.target.value
    })
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    })
  }

  saveEvent() {
    const { title, description, eventDate, price, available_tickets, scheme_url, location } = this.state

    this.props
      .createEvent({ title, description, eventDate, price: parseFloat(price), available_tickets: parseInt(available_tickets), scheme_url, location })
      .then((data) => {
        this.setState({
          id: data.id,
          title: data.title,
          description: data.description,
          eventDate: data.eventDate,
          price: data.price,
          available_tickets: data.available_tickets,
          scheme_url: data.scheme_url,
          location: data.location,

          submitted: true
        })
        console.log(data)
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

  render() {
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
                value={this.state.title}
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
                value={this.state.description}
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
                value={this.state.eventDate}
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
                value={this.state.price}
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
                value={this.state.available_tickets}
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
                value={this.state.scheme_url}
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
                value={this.state.location}
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

export default connect(null, { createEvent })(AddEvent)
