const db = require('../index');
const Sequelize = require('sequelize');

const Session = db.define('session', {
    sid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      data: Sequelize.STRING,
      expires: Sequelize.DATE,
      userId: Sequelize.STRING,
      isAuthenticated: Sequelize.BOOLEAN
})

module.exports = Session;