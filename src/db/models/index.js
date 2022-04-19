const { Veterinarian, VeterinarianSchema } = require('./Veterinarian.model');
const { Patient, PatientSchema } = require('./Patient.model');
const { Task, TaskSchema } = require('./Task.model');
const { Appointment, AppointmentsSchema } = require('./Appointments.model');

function setupModels(sequelize) {
  Veterinarian.init(VeterinarianSchema, Veterinarian.config(sequelize));
  Patient.init(PatientSchema, Patient.config(sequelize));
  Task.init(TaskSchema, Task.config(sequelize));
  Appointment.init(AppointmentsSchema, Appointment.config(sequelize));

  Veterinarian.associate(sequelize.models);
  Patient.associate(sequelize.models);
  Appointment.associate(sequelize.models);
}

module.exports = setupModels;
