module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
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
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    }
  }, { underscored: true });

  return Users;
};
