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
// const Privilege = db.privilege;

db.sequelize.sync();
// drop the table if it already exists
// db.sequelize.sync().then(() => {
//   initial()
// });

// function initial() {
//   Privilege.create({
//     id: 1,
//     discount_value: 0,
//     name: "None"
//   })

//   Privilege.create({
//     id: 2,
//     discount_value: 50,
//     name: "Student"
//   })

//   Privilege.create({
//     id: 3,
//     discount_value: 70,
//     name: "Veteran"
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
