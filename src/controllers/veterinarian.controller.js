const router = require('express').Router();
const Response = require('../libs/Response');
const VeterinarianService = require('../services/Veterinarian.service');
// const validationHandler = require('../middlewares/validation.handler');

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

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const veterinarian = await veterinarianService.getOne(id);
    response.success(res, veterinarian);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const veterinarian = await veterinarianService.create(body);
    response.success(res, veterinarian, 201);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/create-task', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const task = await veterinarianService.createTask(id, body);
    response.success(res, task, 201);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedVet = await veterinarianService.totalUpdate(id, body);
    response.success(res, updatedVet);
  } catch (error) {
    next(error);
  }
});

router.put('/:veterinarianId/update-task/:taskId', async (req, res, next) => {
  try {
    const { taskId, veterinarianId } = req.params;
    const { body } = req;
    const updatedTask = await veterinarianService.totalTaskUpdate(veterinarianId, taskId, body);
    response.success(res, updatedTask);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedVet = await veterinarianService.partialUpdate(id, body);
    response.success(res, updatedVet);
  } catch (error) {
    next(error);
  }
});

router.patch('/:veterinarianId/update-task/:taskId', async (req, res, next) => {
  try {
    const { taskId, veterinarianId } = req.params;
    const { body } = req;
    const updatedTask = await veterinarianService.partialTaskUpdate(veterinarianId, taskId, body);
    response.success(res, updatedTask);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedVet = await veterinarianService.delete(id);
    response.success(res, deletedVet);
  } catch (error) {
    next(error);
  }
});

router.delete('/:veterinarianId/delete-task/:taskId', async (req, res, next) => {
  try {
    const { taskId, veterinarianId } = req.params;
    const deletedTask = await veterinarianService.deleteTask(veterinarianId, taskId);
    response.success(res, deletedTask);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
