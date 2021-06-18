import React, { Component } from "react"

import EventsDataService from "../../services/events.service"

class Event extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentEvent: {
        id: null,
        title: "",
        description: "",
        event_date: "",
        price: 0,
        scheme_url: "",
        location: "",
      }
    }
  }

  componentDidMount() {
    this.getEvent(this.props.match.params.id)
  }

  getEvent(id) {
    EventsDataService.get(id)
      .then((response) => {
        this.setState({
          currentEvent: response.data,
        })
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
   const { currentEvent } = this.state

    return (
      <div className="card text-center mb-3" style={{ margin: '0 auto', width: '20rem' }}>
        <div className="card-body">
          <h5 className="card-title">{currentEvent.title}</h5>
          <p className="card-text text-left">Description: {currentEvent.description}</p>
          <p className="card-text text-left">Remaining tickets: {currentEvent.available_tickets}</p>
          <p className="card-text text-left">Location: {currentEvent.location}</p>
          <h5 className="card-text text-left">Price: {currentEvent.price}₽</h5>
        </div>
      </div>
    )
  }
}

export default Event
