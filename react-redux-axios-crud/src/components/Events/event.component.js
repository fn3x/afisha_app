import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import EventsDataService from "../../services/events_db.service"
import { addEventToUser } from "../../actions/users_events"

class Event extends Component {
  constructor(props) {
    super(props)

    this.buyTicket = this.buyTicket.bind(this)

    this.state = {
      currentEvent: {
        id: null,
        title: "",
        description: "",
        event_date: "",
        price: 0,
        scheme_url: "",
        location: "",
      },
      successful: false
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
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
   const { currentEvent, successful } = this.state

    return (
      <div className="card text-center mb-3" style={{ margin: '0 auto', width: '20rem' }}>
        <div className="card-body">
          <h5 className="card-title">{currentEvent.title}</h5>
          <p className="card-text text-left">Description: {currentEvent.description}</p>
          <p className="card-text text-left">Remaining tickets: {currentEvent.available_tickets}</p>
          <p className="card-text text-left">Location: {currentEvent.location}</p>
          <h5 className="card-text text-left">Price: {currentEvent.price}₽</h5>
          {
            successful ?
            <h5 className="card-text text-center" style={{ color: 'green' }}>You have successfully bought ticket.</h5>
            :
            this.renderFooter()
          }
        </div>
      </div>
    )
  }

  buyTicket() {
    const { user, addEventToUser } = this.props
    const { currentEvent } = this.state

    addEventToUser(user.id, currentEvent.id)
      .then((response) => {
        console.log(`User ${response.user_id} bought ticket for event ${response.event_id}`)
        this.setState({
          successful: true
        })
        this.getEvent(response.event_id)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  renderFooter() {
    const { user } = this.props
    const { currentEvent } = this.state

    const button = user.roles.includes("ROLE_ADMIN") ?
      <Link to={`/events/change/${currentEvent.id}`}>
        <button
          className="btn btn-primary"
          type="button"
        >
          Change event
        </button>
      </Link>
      :
      <button className="btn btn-primary" onClick={this.buyTicket} disabled={!currentEvent.available_tickets}>Buy ticket</button>

    return button
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps, { addEventToUser })(Event)
