const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('email', {
      email_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      body: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      threadid: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdat: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedat: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model:'users',key:'user_id'}
      },
      isread:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
      },
      messageid:{
        type: Sequelize.INTEGER
      },
      isreplyto:{
        type: Sequelize.STRING
      },
      isscheduledat:{
        allowNull: false,
        type: Sequelize.DATE
      },
      snippet:{
        allowNull: false,
        type: Sequelize.STRING
      },
      isarchieve:{
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      istrash:{
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
    });
  }
  async function down({ context: queryInterface }) {
    await queryInterface.dropTable('email');
  }

  module.exports = { up, down };