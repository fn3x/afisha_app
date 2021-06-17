module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("event", {
    title: {
      type: Sequelize.STRING
    },
    event_date: {
      type: Sequelize.DATE
    },
    price: {
      type: Sequelize.DECIMAL
    },
    available_tickets: {
      type: Sequelize.INTEGER
    },
    scheme_url: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
  });

  return Event;
};
