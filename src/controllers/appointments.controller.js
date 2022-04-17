const router = require('express').Router();
const Response = require('../libs/Response');
const AppointmentsService = require('../services/Appointments.service');

const response = new Response();
const appointmentService = new AppointmentsService();

router.get('/', async (req, res, next) => {
  try {
    const appointments = await appointmentService.getAll();
    response.success(res, appointments);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentService.getOne(id);
    response.success(res, appointment);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const newAppointment = await appointmentService.create(body);
    response.success(res, newAppointment, 201);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const appointment = await appointmentService.totalUpdate(id, body);
    response.success(res, appointment);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const appointment = await appointmentService.partialUpdate(id, body);
    response.success(res, appointment);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await appointmentService.delete(id);
    response.success(res, deletedAppointment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
