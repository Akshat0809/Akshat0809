const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('folders', {
      folder_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id: {
        type: Sequelize.INTEGER,
        references:{model:'Users',key:'user_id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      providerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  }

  async function down({ context: queryInterface }) {
    await queryInterface.dropTable('Folder');
  }
  module.exports = { up, down };
