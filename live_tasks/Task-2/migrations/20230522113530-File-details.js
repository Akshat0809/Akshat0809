const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('file_details', {
      file_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              name: {
                type: Sequelize.STRING
              },
              createdat: {
                allowNull: false,
                type: Sequelize.DATE
              }
        });
  }

  async function down({ context: queryInterface }) {
    await queryInterface.dropTable('file_details');
  }

module.exports = { up, down };




