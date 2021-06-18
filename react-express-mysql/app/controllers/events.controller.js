const moment = require('moment');
const db = require("../models");
const Events = db.events;
const Op = db.Sequelize.Op;

// Create and Save a new event
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an event
  const event = {
    title: req.body.title,
    event_date: req.body.date,
    price: req.body.price,
    available_tickets: req.body.available_tickets,
    scheme_url: req.body.scheme_url,
    location: req.body.location,
    createdAt: moment().format(),
    updatedAt: moment().format()
  };

  // Save event in the database
  Events.create(event)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all events from the database.
exports.findAll = (req, res) => {
  const event = req.query.event;
  var condition = event ? { title: { [Op.like]: `%${event}%` } } : null;

  Events.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Events.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update an event by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const data = Object.assign(req.body, {
    updated_at: moment().format()
  })

  Events.update(data, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update event with id=${id}. Maybe event was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating event with id=" + id
      });
    });
};

// Delete an event with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Events.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete event with id=${id}. Maybe event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete event with id=" + id
      });
    });
};

// Delete all events from the database.
exports.deleteAll = (req, res) => {
  Events.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} event were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all events."
      });
    });
};
