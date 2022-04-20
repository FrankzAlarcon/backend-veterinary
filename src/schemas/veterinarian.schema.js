const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const email = Joi.string().email();
const password = Joi.string().min(8);
const veterinarianId = Joi.number().integer();
const taskId = Joi.number().integer();

const text = Joi.string().min(3);
const priority = Joi.string().pattern(/high|medium|low/);

const createVeterinarianSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
});

const updateVeterinarianSchema = Joi.object({
  name,
  email,
  password,
});

const getVeterinarianByIdSchema = Joi.object({
  id: id.required(),
});

const createTaskSchema = Joi.object({
  text: text.required(),
  priority,
});

const getTaskFromVeterinarianSchema = Joi.object({
  veterinarianId: veterinarianId.required(),
  taskId: taskId.required(),
});

const updateTaskSchema = Joi.object({
  text,
  priority,
});

const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const registerSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
});

module.exports = {
  createTaskSchema,
  createVeterinarianSchema,
  updateVeterinarianSchema,
  updateTaskSchema,
  getTaskFromVeterinarianSchema,
  getVeterinarianByIdSchema,
  loginSchema,
  registerSchema,
};
