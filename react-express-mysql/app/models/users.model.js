module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    login: {
      type: Sequelize.STRING(45)
    },
    password: {
      type: Sequelize.STRING(20)
    },
    name: {
      type: Sequelize.STRING(45)
    },
    phone: {
      type: Sequelize.INTEGER(11)
    },
    email: {
      type: Sequelize.INTEGER(45)
    }
  }, { underscored: true });

  return Users;
};
