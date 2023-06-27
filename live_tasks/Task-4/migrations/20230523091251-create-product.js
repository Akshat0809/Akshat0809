const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('product_details', {
      id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              file_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references:{model:'file_details',key:'file_id'},
                onUpdate:'CASCADE',
                onDelete:'CASCADE'
              },
              product_id: {
                type: Sequelize.INTEGER
              },
              sku: {
                type: Sequelize.STRING
              },
              FulfillmentPartnerCode: {
                type: Sequelize.STRING
              },
              ManufacturerPartNumber: {
                allowNull: false,
                type: Sequelize.STRING
              },
              created: {
                allowNull: false,
                type: Sequelize.INTEGER
              },
              LeadTime: {
                allowNull: false,
                type: Sequelize.INTEGER
              },
              Product_part_number: {
                allowNull: true,
                type: Sequelize.INTEGER
              },
              error: {
                allowNull: true,
                type: Sequelize.STRING
              },
              
    });
  }

  async function down({ context: queryInterface }) {
    await queryInterface.dropTable('product_details');
  }

module.exports = { up, down };




