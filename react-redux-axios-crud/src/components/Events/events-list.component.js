import React, { Component } from "react"
import { connect } from "react-redux"
import {
  retrieveEvents,
  findByTitle,
  deleteAllEvents,
  deleteEvent
} from "../../actions/events"
import { Link } from "react-router-dom"

class EventsList extends Component {
  constructor(props) {
    super(props)
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.findByTitle = this.findByTitle.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)

    this.state = {
      currentEvent: null,
      currentIndex: -1,
      searchTitle: ""
    }
  }

  componentDidMount() {
    this.props.retrieveEvents()
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value

    this.setState({
      searchTitle: searchTitle
    })
  }

  findByTitle() {
    this.props
      .findByTitle(this.state.searchTitle)
      .then((response) => {
        this.refreshData()
      })
      .catch((e) => {
        console.log(e)
      })

    this.refreshData()
  }

  refreshData() {
    this.setState({
      currentEvent: null,
      currentIndex: -1,
    })
  }

  setActiveEvent(event, index) {
    this.setState({
      currentEvent: event,
      currentIndex: index,
    })
  }

  deleteEvent(eventId) {
    const { deleteEvent, retrieveEvents } = this.props

    deleteEvent(eventId)
      .then(retrieveEvents())
      .catch(err => console.error(err.message))
  }

  render() {
    const { searchTitle } = this.state
    const { events, user } = this.props

    return (
      <div className="list row">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByTitle}
              >
                Search
              </button>
              {
                user && user.roles.includes("ROLE_ADMIN") &&
                <Link to={"/events/add"}>
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                  >
                    Add event
                  </button>
                </Link>
              }
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <h4>Events List</h4>
            <div className="card-deck">
              {events &&
                events.map((event, index) => (
                  <div className="card">
                    <div
                      className="card-body"
                      key={index}
                      >
                      <h5 className="card-title">{event.title}</h5>
                      <p className="card-text">Description: {event.description}</p>
                      <p className="card-text text-muted">Tickets: {event.available_tickets}</p>
                      <div class="buttons" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Link
                          to={"/events/" + event.id}
                          className="btn btn-warning"
                        >
                          More
                        </Link>
                        {
                          user.roles.includes("ROLE_ADMIN") &&
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => this.deleteEvent(event.id)}
                          >
                            Delete
                          </button>
                        }
                      </div>
                    </div>
                  </div>
                ))}
            </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    events: state.events,
    user
  }
}

export default connect(mapStateToProps, {
  retrieveEvents, findByTitle, deleteAllEvents, deleteEvent
})(EventsList)

