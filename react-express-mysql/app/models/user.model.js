module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    login: {
      type: Sequelize.STRING(45)
    },
    password: {
      type: Sequelize.STRING(20)
    },
    is_admin: {
      type: Sequelize.BOOLEAN
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
  });

  return User;
};
