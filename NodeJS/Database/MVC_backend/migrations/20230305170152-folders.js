// const { Sequelize } = require('sequelize');

// async function up({ context: queryInterface }) {
// 	await queryInterface.createTable('folders', {
// 		folder_id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.INTEGER
//     },
//     name: {
//       type: Sequelize.STRING
//     },
//     id: {
//       allowNull: false,
//       type: Sequelize.INTEGER,
//       references:{model:'user',key:'id'},
//       onDelete:"CASCADE",
//       onUpdate:"CASCADE"
//     }
// 	});
// }

// async function down({ context: queryInterface }) {
// 	await queryInterface.dropTable('folders');
// }

// module.exports = { up, down };


'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('folders', {
      folder_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model:'user',key:'id'},
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('folders');
  }
};