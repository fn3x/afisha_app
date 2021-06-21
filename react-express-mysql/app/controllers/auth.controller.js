const db = require("../models")
const config = require("../config/auth.config")
const Users = db.users
const Role = db.role
const Privilege = db.privilege

const Op = db.Sequelize.Op

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  Users.create({
    login: req.body.login,
    name: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            user.setPrivileges([0])
              .then(() => {
                res.send({ message: "User was registered successfully!" })
              })
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
            Privilege.findAll({
              where: {
                name: req.body.category
              }
            }).then((privileges) => {
              user.setPrivileges(privileges)
                .then(() => {
                  res.send({ message: "User was registered successfully!" })
                })
            })
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  Users.findOne({
    where: {
      login: req.body.login
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        })
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        user.getPrivileges().then(privileges => {
          const discountValue = privileges[0].discount_value

          res.status(200).send({
            id: user.id,
            login: user.login,
            name: user.username,
            email: user.email,
            roles: authorities,
            discountValue,
            accessToken: token
          });
        })
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};