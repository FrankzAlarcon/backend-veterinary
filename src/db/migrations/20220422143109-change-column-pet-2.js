const { DataTypes, Sequelize } = require('sequelize');
const { petsTableName } = require('../models/Pets.model');

module.exports = {
  async up(queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn(petsTableName, 'created_at', {
      type: DataTypes.DATE,
      default: Sequelize.NOW,
      allowNull: false,
      field: 'created_at',
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn(petsTableName, 'created_at', {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      field: 'created_at',
    });
  },
};
