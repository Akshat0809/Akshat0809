// const { Sequelize } = require('sequelize');

// async function up({ context: queryInterface }) {
// 	await queryInterface.createTable('user', {
// 		id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.INTEGER
//     },
//     username: {
//       type: Sequelize.STRING
//     },
//     password: {
//       type: Sequelize.STRING
//     },
//     email_address: {
//       type: Sequelize.STRING
//     }
// 	});
// }

// async function down({ context: queryInterface }) {
// 	await queryInterface.dropTable('user');
// }

// module.exports = { up, down };

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email_address: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};