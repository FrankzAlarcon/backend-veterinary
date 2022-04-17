const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const petName = Joi.string();
const email = Joi.string().email();

const createPatientSchema = Joi.object({
  name: name.required(),
  petName: petName.required(),
  email: email.required(),
});

const updatePatientSchema = Joi.object({
  name,
  petName,
  email,
});

const getPatientByIdSchema = Joi.object({
  id: id.required(),
});

module.exports = { createPatientSchema, updatePatientSchema, getPatientByIdSchema };
