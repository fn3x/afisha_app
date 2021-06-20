const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = __dirname + '/app/views/';

const app = express();

app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// drop the table if it already exists
// db.sequelize.sync().then(() => {
//   console.log("Drop and re-sync db.")
//   initial()
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   })
 
//   Role.create({
//     id: 2,
//     name: "moderator"
//   })
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   })
// }

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

require('./app/routes/auth.routes')(app);
require("./app/routes/events.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/users_events.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
