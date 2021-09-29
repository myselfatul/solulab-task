'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      qty_per_unit: {
        type: Sequelize.INTEGER
      },
      unit_price: {
        type: Sequelize.FLOAT
      },
      unit_in_stock: {
        type: Sequelize.INTEGER
      },
      discontinued: {
        type: Sequelize.BOOLEAN
      },
      category_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'category',
          key:'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      underscored: true,
      freezeTableName: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product');
  }
};