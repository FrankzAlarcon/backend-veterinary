const { DataTypes } = require('sequelize');
const { patientTableName } = require('../models/Patient.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn(patientTableName, 'pet_name');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.add(
      patientTableName,
      'pet_name',
      {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'pet_name',
      },
    );
  },
};
