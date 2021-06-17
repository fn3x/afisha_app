module.exports = (sequelize, Sequelize) => {
  const UsersEvents = sequelize.define("users_events", {
    user_id: {
      type: Sequelize.INTEGER
    },
    event_id: {
      type: Sequelize.INTEGER
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    }
  }, { underscored: true });

  return UsersEvents;
};
