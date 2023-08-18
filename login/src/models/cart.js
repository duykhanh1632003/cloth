'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.AdminItem, { foreignKey: 'idItem' });

    }
  };
  Cart.init({
  idUser : DataTypes.INTEGER,
	numerWantBuy: DataTypes.INTEGER,
	price: DataTypes.INTEGER,
	currentNumber: DataTypes.INTEGER,
	name: DataTypes.STRING,
	image: DataTypes.BLOB('long'),
	idItem: DataTypes.INTEGER,
  totalMoneyCart: DataTypes.INTEGER('long')
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};