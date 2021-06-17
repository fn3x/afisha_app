module.exports = (sequelize, Sequelize) => {
  const Events = sequelize.define("events", {
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
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    }
  }, { underscored: true });

  return Events;
};
