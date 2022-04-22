const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const petName = Joi.string();
const email = Joi.string().email();
const animalType = Joi.string();

const createPatientSchema = Joi.object({
  name: name.required(),
  email: email.required(),
});

const updatePatientSchema = Joi.object({
  name,
  email,
});

const getPatientByIdSchema = Joi.object({
  id: id.required(),
});

const addPetSchema = Joi.object({
  petName: petName.required(),
  animalType: animalType.required(),
});

const updatePetSchema = Joi.object({
  petName,
  animalType,
});

module.exports = {
  createPatientSchema,
  updatePatientSchema,
  getPatientByIdSchema,
  addPetSchema,
  updatePetSchema,
};
