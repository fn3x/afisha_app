module.exports = app => {
  const usersEvents = require("../controllers/users_events.controller.js");

  var router = require("express").Router();

  // Create a new event
  router.post("/", usersEvents.create);

  // Retrieve all Tutorials
  router.get("/", usersEvents.findAll);

  // Retrieve a single event with id
  router.get("/byUserId/:userId", usersEvents.findByUserId);

  // Update a event with id
  router.put("/:id", usersEvents.update);

  // Delete a event with id
  router.delete("/:id", usersEvents.delete);

  // Delete all usersEvents
  router.delete("/", usersEvents.deleteAll);

  app.use('/api/users_events', router);
};
