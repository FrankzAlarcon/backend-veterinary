const router = require('express').Router();
const Response = require('../libs/Response');
const AppointmentsService = require('../services/Appointments.service');
const validationHandler = require('../middlewares/validation.handler');
const { createAppointmentSchema, getAppointmentByIdSchema, updateAppointmentSchema } = require('../schemas/appointments.schema');

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

router.get(
  '/:id',
  validationHandler(getAppointmentByIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const appointment = await appointmentService.getOne(id);
      response.success(res, appointment);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validationHandler(createAppointmentSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newAppointment = await appointmentService.create(body);
      response.success(res, newAppointment, 201);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validationHandler(getAppointmentByIdSchema, 'params'),
  validationHandler(createAppointmentSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const appointment = await appointmentService.totalUpdate(id, body);
      response.success(res, appointment);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validationHandler(getAppointmentByIdSchema, 'params'),
  validationHandler(updateAppointmentSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const appointment = await appointmentService.partialUpdate(id, body);
      response.success(res, appointment);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validationHandler(getAppointmentByIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedAppointment = await appointmentService.delete(id);
      response.success(res, deletedAppointment);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
