// const { Sequelize } = require('sequelize');

// async function up({ context: queryInterface }) {
// 	await queryInterface.createTable('junction', {
// 		email_id: {
//       allowNull: false,
//       type: Sequelize.INTEGER,
//       references:{model:'email',key:'email_id'},
//       onDelete:"CASCADE",
//       onUpdate:"CASCADE"
//     },
//     folder_id: {
//       allowNull: false,
//       type: Sequelize.INTEGER,
//       references:{model:'folders',key:'folder_id'},
//       onDelete:"CASCADE",
//       onUpdate:"CASCADE"
//     }
// 	});
// }

// async function down({ context: queryInterface }) {
// 	await queryInterface.dropTable('junction');
// }

// module.exports = { up, down };

  'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('junction', {
      email_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model:'email',key:'email_id'},
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      folder_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model:'folders',key:'folder_id'},
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('junction');
  }
};