// const { Sequelize } = require('sequelize');

// async function up({ context: queryInterface }) {
// 	await queryInterface.createTable('recipient', {
// 		rec_id: {
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
//     types: {
//       type: Sequelize.STRING
//     },
//     email_address: {
//       type: Sequelize.STRING
//     }
// 	});
// }

// async function down({ context: queryInterface }) {
// 	await queryInterface.dropTable('recipient');
// }

// module.exports = { up, down };

  'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipient', {
      rec_id: {
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
      types: {
        type: Sequelize.STRING
      },
      email_address: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recipient');
  }
};