module.exports = (sequelize, Sequelize) => {
  const UsersEvents = sequelize.define("users_events", {
    user_id: {
      type: Sequelize.INTEGER
    },
    event_id: {
      type: Sequelize.INTEGER
    }
  }, { underscored: true });

  return UsersEvents;
};
