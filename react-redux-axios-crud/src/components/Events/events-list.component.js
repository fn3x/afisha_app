import React, { Component } from "react"
import { connect } from "react-redux"
import {
  retrieveEvents,
  findByTitle,
  deleteAllEvents
} from "../../actions/events"
import { Link } from "react-router-dom"

class EventsList extends Component {
  constructor(props) {
    super(props)
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.findByTitle = this.findByTitle.bind(this)
    this.removeAllEvents = this.removeAllEvents.bind(this)

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
        console.log(response)
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

  removeAllEvents() {
    this.props
      .deleteAllEvents()
      .then((response) => {
        console.log(response)
        this.refreshData()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
    const { searchTitle } = this.state
    const { events } = this.props

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
                      <p className="card-text">Описание: {event.description}</p>
                      <p className="card-text"><small className="text-muted">Осталось билетов: {event.available_tickets}</small></p>
                      <Link
                        to={"/events/" + event.id}
                        className="badge badge-warning"
                      >
                        Подробнее
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
        </div>
        <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllEvents}
          >
            Remove All
          </button>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    events: state.events,
  }
}

export default connect(mapStateToProps, {
  retrieveEvents, findByTitle, deleteAllEvents
})(EventsList)

