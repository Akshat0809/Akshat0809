// const { Sequelize } = require('sequelize');

// async function up({ context: queryInterface }) {
//   await queryInterface.createTable('Users', {
//     user_id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.INTEGER
//     },
//     name: {
//       type: Sequelize.STRING
//     },
//     email: {
//       type: Sequelize.STRING,
//       unique: true
//     },
//     password: {
//       type: Sequelize.STRING
//     },
//     RefreshToken: {
//       type: Sequelize.STRING // corrected data type
//     },
//     AccessToken: {
//       type: Sequelize.STRING // corrected data type
//     }
//   });
// }

// async function down({ context: queryInterface }) {
//   await queryInterface.dropTable('Users');
// }

// module.exports = { up, down };


'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      RefreshToken: {
        type: Sequelize.STRING // corrected data type
      },
      AccessToken: {
        type: Sequelize.STRING // corrected data type
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};