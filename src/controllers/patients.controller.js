const router = require('express').Router();
const Response = require('../libs/Response');
const PatientService = require('../services/Patient.service');
const validationHandler = require('../middlewares/validation.handler');
const {
  createPatientSchema, getPatientByIdSchema,
  updatePatientSchema, addPetSchema, updatePetSchema,
  getPetsFromPatientSchema,
} = require('../schemas/patients.schema');

const response = new Response();
const patientService = new PatientService();

router.get('/', async (req, res, next) => {
  try {
    const patients = await patientService.getAll();
    response.success(res, patients);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validationHandler(getPatientByIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const patient = await patientService.getOne(id);
      response.success(res, patient);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id/pets',
  validationHandler(getPatientByIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const pets = await patientService.getPets(id);
      response.success(res, pets);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validationHandler(createPatientSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newPatient = await patientService.create(body);
      response.success(res, newPatient, 201);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/:id/pets',
  validationHandler(getPatientByIdSchema, 'params'),
  validationHandler(addPetSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const pet = await patientService.addPet(id, body);
      response.success(res, pet, 201);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validationHandler(getPatientByIdSchema, 'params'),
  validationHandler(createPatientSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedPat = await patientService.totalUpdate(id, body);
      response.success(res, updatedPat);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validationHandler(getPatientByIdSchema, 'params'),
  validationHandler(updatePatientSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedPat = await patientService.partialUpdate(id, body);
      response.success(res, updatedPat);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:patientId/pets/:petId',
  validationHandler(getPetsFromPatientSchema, 'params'),
  validationHandler(updatePetSchema, 'body'),
  async (req, res, next) => {
    try {
      const { patientId, petId } = req.params;
      const { body } = req;
      const updatedPet = await patientService.patialUpdatePet(patientId, petId, body);
      response.success(res, updatedPet);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validationHandler(getPatientByIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedPat = await patientService.delete(id);
      response.success(res, deletedPat);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
