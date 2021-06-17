const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const user = {
    login: req.body.login,
    password: req.body.password,
    is_admin: 0,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  };

  // Save user in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating user."
      });
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  const user = req.query.user;
  var condition = user ? { title: { [Op.like]: `%${user}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
};

// Update user by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const data = Object.assign(req.body, { updatedAt: Sequelize.DATE })

  User.update(data, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Delete user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all user."
      });
    });
};
