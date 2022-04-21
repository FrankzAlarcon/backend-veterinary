const router = require('express').Router();
const Response = require('../libs/Response');
const VeterinarianService = require('../services/Veterinarian.service');
const validationHandler = require('../middlewares/validation.handler');
const {
  createTaskSchema, createVeterinarianSchema, getVeterinarianByIdSchema,
  updateTaskSchema, updateVeterinarianSchema, getTaskFromVeterinarianSchema,
  loginSchema, registerSchema,
} = require('../schemas/veterinarian.schema');

const response = new Response();
const veterinarianService = new VeterinarianService();

router.get('/', async (req, res, next) => {
  try {
    const veterinarians = await veterinarianService.getAll();
    response.success(res, veterinarians);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validationHandler(getVeterinarianByIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const veterinarian = await veterinarianService.getOne(id);
      response.success(res, veterinarian);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id/patients',
  validationHandler(getVeterinarianByIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const patients = await veterinarianService.getPatients(id);
      response.success(res, patients);
    } catch (error) {
      next(error);
    }
  },
);

// router.post(
//   '/',
//   validationHandler(createVeterinarianSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { body } = req;
//       const veterinarian = await veterinarianService.create(body);
//       response.success(res, veterinarian, 201);
//     } catch (error) {
//       next(error);
//     }
//   },
// );

router.post(
  '/register',
  validationHandler(registerSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const isRegister = await veterinarianService.register(data);
      response.success(res, isRegister, 200);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/login',
  validationHandler(loginSchema, 'body'),
  async (req, res, next) => {
    try {
      const credentials = req.body;
      const isLogin = await veterinarianService.login(credentials);
      response.success(res, isLogin);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/:id/create-task',
  validationHandler(getVeterinarianByIdSchema, 'params'),
  validationHandler(createTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const task = await veterinarianService.createTask(id, body);
      response.success(res, task, 201);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validationHandler(getVeterinarianByIdSchema, 'params'),
  validationHandler(createVeterinarianSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedVet = await veterinarianService.totalUpdate(id, body);
      response.success(res, updatedVet);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:veterinarianId/update-task/:taskId',
  validationHandler(getTaskFromVeterinarianSchema, 'params'),
  validationHandler(createTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const { taskId, veterinarianId } = req.params;
      const { body } = req;
      const updatedTask = await veterinarianService.totalTaskUpdate(veterinarianId, taskId, body);
      response.success(res, updatedTask);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validationHandler(getVeterinarianByIdSchema, 'params'),
  validationHandler(updateVeterinarianSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedVet = await veterinarianService.partialUpdate(id, body);
      response.success(res, updatedVet);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:veterinarianId/update-task/:taskId',
  validationHandler(getTaskFromVeterinarianSchema, 'params'),
  validationHandler(updateTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const { taskId, veterinarianId } = req.params;
      const { body } = req;
      const updatedTask = await veterinarianService.partialTaskUpdate(veterinarianId, taskId, body);
      response.success(res, updatedTask);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validationHandler(getVeterinarianByIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedVet = await veterinarianService.delete(id);
      response.success(res, deletedVet);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:veterinarianId/delete-task/:taskId',
  validationHandler(getTaskFromVeterinarianSchema, 'params'),
  async (req, res, next) => {
    try {
      const { taskId, veterinarianId } = req.params;
      const deletedTask = await veterinarianService.deleteTask(veterinarianId, taskId);
      response.success(res, deletedTask);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
