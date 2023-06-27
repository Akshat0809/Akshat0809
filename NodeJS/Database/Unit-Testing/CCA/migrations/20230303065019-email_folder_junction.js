
// const { Sequelize } = require('sequelize');

// async function up({ context: queryInterface }) {
//     await queryInterface.createTable('Junction', {
//       email_id: {
//         allowNull: false,
//         type: Sequelize.INTEGER,
//         references:{model:'email',key:'email_id'}
//       },
//       folder_id: {
//         allowNull: false,
//         type: Sequelize.INTEGER,
//         references:{model:'Folder',key:'folder_id'}
//       },
//     });
//   }

//   async function down({ context: queryInterface }) {
//     await queryInterface.dropTable('Junction');
//   }

//   module.exports = { up, down };


  'use strict';
  /** @type {import('sequelize-cli').Migration} */
  module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Junction', {
        email_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references:{model:'email',key:'email_id'}
        },
        folder_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references:{model:'Folder',key:'folder_id'}
        },
      });
    },
    async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('Junction');
    }
  };