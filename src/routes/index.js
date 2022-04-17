const router = require('express').Router();
const veterinariansRouter = require('../controllers/veterinarian.controller');
const patientsRouter = require('../controllers/patients.controller');
const appointmentsRouter = require('../controllers/veterinarian.controller');

function appRouter(app) {
  app.use('/api/v1', router);
  router.use('/veterinarians', veterinariansRouter);
  router.use('/patients', patientsRouter);
  router.use('appointments', appointmentsRouter);
}

module.exports = appRouter;
