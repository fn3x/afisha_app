module.exports = app => {
  const events = require("../controllers/event.controller.js");

  var router = require("express").Router();

  // Create a new event
  router.post("/", events.create);

  // Retrieve all Tutorials
  router.get("/", events.findAll);

  // Retrieve a single event with id
  router.get("/:id", events.findOne);

  // Update a event with id
  router.put("/:id", events.update);

  // Delete a event with id
  router.delete("/:id", events.delete);

  // Delete all events
  router.delete("/", events.deleteAll);

  app.use('/api/events', router);
};
