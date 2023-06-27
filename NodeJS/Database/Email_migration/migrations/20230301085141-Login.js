const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull:false
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email_address: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false
      }
    });
  }

  async function down({ context: queryInterface }) {
    await queryInterface.dropTable('Users');
  }
  module.exports = { up, down };
