'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminItem extends Model {

    static associate(models) {
      AdminItem.hasMany(models.Cart, { foreignKey: 'idItem' });
    }	
  }
  
  AdminItem.init({
  idAdmin:DataTypes.STRING,
	name:DataTypes.STRING,
	sale:DataTypes.INTEGER,
	priceItem:DataTypes.INTEGER,
	count: DataTypes.INTEGER,
  currentNumer: DataTypes.INTEGER,
	image:DataTypes.BLOB('long'),
	contentMarkdown:DataTypes.TEXT('long'),
	contentHTML:DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'AdminItem',
  });
  return AdminItem;Cart
};