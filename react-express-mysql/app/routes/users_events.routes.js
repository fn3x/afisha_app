module.exports = app => {
  const usersEvents = require("../controllers/users_events.controller.js");

  var router = require("express").Router();

  router.get("/userId/:userId/eventId/:eventId", usersEvents.create);

  router.get("/user/", usersEvents.findAll);

  router.get("/user/:userId", usersEvents.findByUserId);

  router.get("/event/:eventId", usersEvents.findByEventId);

  router.put("/user/:userId", usersEvents.update);

  router.delete("/user/:userId", usersEvents.delete);

  router.delete("/", usersEvents.deleteAll);

  app.use('/api/users_events', router);
};
