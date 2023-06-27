// const { Sequelize } = require('sequelize');

// async function up({ context: queryInterface }) {
// 	await queryInterface.createTable('attachment', {
// 		att_id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.INTEGER
//     },
//     email_id: {
//       allowNull: false,
//       type: Sequelize.INTEGER,
//       references:{model:'email',key:'email_id'},
//       onDelete:"CASCADE",
//       onUpdate:"CASCADE"
//     },
//     file_name: {
//       type: Sequelize.STRING
//     },
//     size: {
//       type: Sequelize.INTEGER
//     },
//     type: {
//       type: Sequelize.STRING
//     },
//     path: {
//       type: Sequelize.STRING
//     }
// 	});
// }

// async function down({ context: queryInterface }) {
// 	await queryInterface.dropTable('attachment');
// }

// module.exports = { up, down };

  'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attachment', {
      att_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model:'email',key:'email_id'},
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      file_name: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('attachment');
  }
};

