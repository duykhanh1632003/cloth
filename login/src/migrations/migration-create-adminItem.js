'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AdminItems', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idAdmin: {
        type: Sequelize.STRING
      },
      count: {
        type: Sequelize.INTEGER
      },
      currentNumer:   {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sale: {
        type: Sequelize.INTEGER
      },
      priceItem: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.BLOB('long')
      },
      
      contentMarkdown: {
        type: Sequelize.DataTypes.TEXT('long')
      },
      contentHTML: {
        type: Sequelize.DataTypes.TEXT('long')
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AdminItems');
  }
};