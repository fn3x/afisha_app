const db = require("../models");
const Events = db.events;
const Users = db.users;
const UsersEvents = db.usersEvents;
const Op = db.Sequelize.Op;

// Create and Save a new event
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an event
  const usersEvent = {
    user_id: req.body.userId,
    event_id: req.body.eventId,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  };

  // Save event in the database
  UsersEvents.create(usersEvent)
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

exports.findAll = (req, res) => {
  const event = req.query.event;
  var condition = event ? { title: { [Op.like]: `%${event}%` } } : null;

  UsersEvents.findAll({
    where: condition,
    include: [
      {
        model: Users
      },
      {
        model: Events
      }
    ]
  })
    .then(usersEvents => {
      return usersEvents.map(userEvent => {
        return Object.assign({},
          {
            user_id: userEvent.user.id,
            user_login: userEvent.user.login,
            user_name: userEvent.user.name,
            events: userEvent.event
          })
      })
    })
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
exports.findByUserId = (req, res) => {
  const userId = req.params.userId;

  UsersEvents.findAll({
    where: { user_id: userId },
    include: [
      {
        model: Users
      },
      {
        model: Events
      }
    ]
  })
    .then(usersEvents => {
      userInfo = Object.assign({}, usersEvents)[0].user.dataValues
      return {
        user_id: userInfo.id,
        user_login: userInfo.login,
        user_name: userInfo.name,
        events: usersEvents.map(userEvent => {
          return userEvent.event
        })
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + userId
      });
    });
};

// Update an event by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  UsersEvents.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete an event with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  UsersEvents.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "UsersEvents was deleted successfully!"
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
  UsersEvents.destroy({
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
