const db = require("../models");
const Events = db.events;
const Users = db.users;
const UsersEvents = db.usersEvents;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const usersEvent = {
    user_id: req.params.userId,
    event_id: req.params.eventId
  };

  UsersEvents.create(usersEvent)
    .then(response => {
      Events.findByPk(usersEvent.event_id)
        .then(event => {
          const updatedData = {...event, available_tickets: (event.available_tickets - 1) }

          Events.update(updatedData, {
            where: { id: usersEvent.event_id }
          })

          res.status(200).send(response);
        })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding event to user."
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
        id: userInfo.id,
        login: userInfo.login,
        name: userInfo.name,
        events: usersEvents.map(userEvent => {
          eventInfo = userEvent.event
          return Object.assign({}, {
            id: eventInfo.id,
            title: eventInfo.title,
            description: eventInfo.description,
            price: eventInfo.price,
            available_tickets: eventInfo.available_tickets,
            location: eventInfo.location,
            scheme_url: eventInfo.scheme_url,
          })
        })
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving events with user id=" + userId
      });
    });
};

exports.findByEventId = (req, res) => {
  const eventId = req.params.eventId;

  UsersEvents.findAll({
    where: { event_id: eventId },
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
      eventInfo = Object.assign({}, usersEvents)[0].event.dataValues
      return {
        id: eventInfo.id,
        title: eventInfo.title,
        description: eventInfo.description,
        price: eventInfo.price,
        available_tickets: eventInfo.available_tickets,
        location: eventInfo.location,
        scheme_url: eventInfo.scheme_url,
        users: usersEvents.map(userEvent => {
          return userEvent.user
        })
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving events with user id=" + userId
      });
    });
};

exports.update = (req, res) => {
  const userId = req.params.userId;
  const data = Object.assign(req.body, {
    updated_at: moment().format()
  })

  UsersEvents.update(data, {
    where: { user_id: userId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Users event was updated successfully."
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

exports.delete = (req, res) => {
  const userId = req.params.userId;

  UsersEvents.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Users event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete users events with user id=${userId}. Maybe event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete event with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  UsersEvents.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} events were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users events."
      });
    });
};
