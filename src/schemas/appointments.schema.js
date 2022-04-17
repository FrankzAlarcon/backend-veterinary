const Joi = require('joi');

const id = Joi.number().integer();
const veterinarianId = Joi.number().integer();
const patientId = Joi.number().integer();
const date = Joi.string();
const symptoms = Joi.string().min(3);
const prescription = Joi.string().min(0);
const isCompleted = Joi.boolean();
const price = Joi.number().min(0);

const createAppointmentSchema = Joi.object({
  veterinarianId: veterinarianId.required(),
  patientId: patientId.required(),
  date: date.required(),
  prescription,
  symptoms: symptoms.required(),
  isCompleted: isCompleted.required(),
  price,
});

const updateAppointmentSchema = Joi.object({
  veterinarianId,
  patientId,
  date,
  prescription,
  isCompleted,
  price,
});

const getAppointmentByIdSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createAppointmentSchema,
  updateAppointmentSchema,
  getAppointmentByIdSchema,
};
