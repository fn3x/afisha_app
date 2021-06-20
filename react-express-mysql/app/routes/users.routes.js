const { authJwt } = require("../middleware");
const users = require("../controllers/users.controller.js");
const router = require("express").Router();

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", users.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    users.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    users.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    users.adminBoard
  );

  router.post("/", users.create);

  router.get("/", users.findAll);

  router.get("/bylogin/:login", users.findByLogin);

  router.get("/:id", users.findOne);

  router.put("/:id", users.update);

  router.delete("/:id", users.delete);

  router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};
