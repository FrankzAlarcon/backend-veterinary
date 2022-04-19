/* eslint-disable no-unused-vars */
const { veterinarianTableName, VeterinarianSchema } = require('../models/Veterinarian.model');
const { patientTableName, PatientSchema } = require('../models/Patient.model');
const { tasksTableName, TaskSchema } = require('../models/Task.model');
const { appointmentsTableName, AppointmentsSchema } = require('../models/Appointments.model');

module.exports = {
  async up(queryInterface, _Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(veterinarianTableName, VeterinarianSchema);
    await queryInterface.createTable(patientTableName, PatientSchema);
    await queryInterface.createTable(tasksTableName, TaskSchema);
    await queryInterface.createTable(appointmentsTableName, AppointmentsSchema);
  },

  async down(queryInterface, _Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(veterinarianTableName);
    await queryInterface.dropTable(patientTableName);
    await queryInterface.dropTable(tasksTableName);
    await queryInterface.dropTable(appointmentsTableName);
  },
};
