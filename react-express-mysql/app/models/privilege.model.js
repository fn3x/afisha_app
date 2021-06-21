module.exports = (sequelize, Sequelize) => {
  const Privilege = sequelize.define("privileges", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    discount_value: {
      type: Sequelize.DECIMAL(10, 0)
    },
    name: {
      type: Sequelize.STRING
    }
  }, { underscored: true, timestamps: false });

  return Privilege;
};