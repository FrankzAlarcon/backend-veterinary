const { Veterinarian, VeterinarianSchema } = require('./Veterinarian.model');
const { Patient, PatientSchema } = require('./Patient.model');
const { Task, TaskSchema } = require('./Task.model');
const { Appointment, AppointmentsSchema } = require('./Appointments.model');
const { Pet, PetsSchema } = require('./Pets.model');

function setupModels(sequelize) {
  Veterinarian.init(VeterinarianSchema, Veterinarian.config(sequelize));
  Patient.init(PatientSchema, Patient.config(sequelize));
  Task.init(TaskSchema, Task.config(sequelize));
  Appointment.init(AppointmentsSchema, Appointment.config(sequelize));
  Pet.init(PetsSchema, Pet.config(sequelize));

  Veterinarian.associate(sequelize.models);
  Patient.associate(sequelize.models);
  Appointment.associate(sequelize.models);
  Pet.associate(sequelize.models);
}

module.exports = setupModels;
