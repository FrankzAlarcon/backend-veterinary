const { DataTypes } = require('sequelize');
const { appointmentsTableName } = require('../models/Appointments.model');
const { veterinarianTableName } = require('../models/Veterinarian.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.renameColumn(appointmentsTableName, 'veterinary_id', 'veterinarian_id');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
