const boom = require('@hapi/boom');
const { models } = require('../db/sequelize');

class PatientService {
  async getAll() {
    const patients = await models.Patient.findAll();
    return patients;
  }

  async getOne(id) {
    const patient = await models.Patient.findByPk(id, {
      include: {
        association: 'appointments',
        attributes: {
          exclude: ['patientId', 'veterinarianId'],
        },
        include: [
          {
            association: 'veterinarian',
            attributes: {
              exclude: ['password', 'createdAt'],
            },
          },
        ],
      },
    });
    if (!patient) {
      throw boom.notFound('Patient not found');
    }
    return patient;
  }

  async create(data) {
    const newPatient = await models.Patient.create(data);
    return newPatient;
  }

  async totalUpdate(id, data) {
    const patient = await this.getOne(id);
    const updatedPatient = await patient.update(data);
    return updatedPatient;
  }

  async partialUpdate(id, changes) {
    const patient = await this.getOne(id);
    const updatedPatient = await patient.update(changes);
    return updatedPatient;
  }

  async delete(id) {
    const patient = await this.getOne(id);
    await patient.destroy();
    return { deleted: true, data: patient };
  }
}

module.exports = PatientService;
