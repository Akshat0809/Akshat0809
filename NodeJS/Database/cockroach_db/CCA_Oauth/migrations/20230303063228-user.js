const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      refresh_token: {
        type: Sequelize.STRING // corrected data type
      },
      access_token: {
        type: Sequelize.STRING // corrected data type
      },
      expiry_date: {
        type: Sequelize.INTEGER
      }
    });
  }

  async function down({ context: queryInterface }) {
    await queryInterface.dropTable('users');
  }
  module.exports = { up, down };
