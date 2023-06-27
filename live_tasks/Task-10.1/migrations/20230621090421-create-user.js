const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('orderId', {
      id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              orderId: {
                type: Sequelize.INTEGER
              }
        });
  }

  async function down({ context: queryInterface }) {
    await queryInterface.dropTable('orderId');
  }

module.exports = { up, down };




