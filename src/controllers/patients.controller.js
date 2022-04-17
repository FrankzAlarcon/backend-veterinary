const router = require('express').Router();
const Response = require('../libs/Response');
const PatientService = require('../services/Patient.service');

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

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const patient = await patientService.getOne(id);
    response.success(res, patient);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const newPatient = await patientService.create(body);
    response.success(res, newPatient, 201);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedPat = await patientService.totalUpdate(id, body);
    response.success(res, updatedPat);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedPat = await patientService.partialUpdate(id, body);
    response.success(res, updatedPat);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPat = await patientService.delete(id);
    response.success(res, deletedPat);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
