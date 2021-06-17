const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.events = require("./events.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.usersEvents = require("./users_events.model.js")(sequelize, Sequelize);

db.users.hasMany(db.usersEvents, { as: 'users' })
db.events.hasMany(db.usersEvents, { as: 'events' })
db.usersEvents.belongsTo(db.events)
db.usersEvents.belongsTo(db.users)

module.exports = db;
