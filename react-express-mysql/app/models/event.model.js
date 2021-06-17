module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("event", {
    title: {
      type: Sequelize.STRING(45)
    },
    description: {
      type: Sequelize.STRING
    },
    event_date: {
      type: Sequelize.DATE
    },
    price: {
      type: Sequelize.DECIMAL(10, 5)
    },
    available_tickets: {
      type: Sequelize.INTEGER
    },
    scheme_url: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING(45)
    },
  });

  return Event;
};
