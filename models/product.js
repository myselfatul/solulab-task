'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.category)
    }
  };
  product.init({
    product_name: DataTypes.STRING,
    qty_per_unit: DataTypes.INTEGER,
    unit_price: DataTypes.FLOAT,
    unit_in_stock: DataTypes.INTEGER,
    discontinued: DataTypes.BOOLEAN,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
    underscored: true,
    freezeTableName: true
  });
  return product;
};