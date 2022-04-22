const boom = require('@hapi/boom');
const { models } = require('../db/sequelize');

class PatientService {
  async getAll() {
    const patients = await models.Patient.findAll();
    return patients;
  }

  async getOne(id) {
    const patient = await models.Patient.findByPk(id, {
      include: [
        {
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
            }, {
              association: 'pet',
              attributes: {
                exclude: ['createdAt'],
              },
            },
          ],
        }, {
          association: 'pets',
          attributes: {
            exclude: ['createdAt'],
          },
        },
      ],
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

  async getPets(id) {
    const pets = await models.Pet.findAll({
      where: {
        patientId: id,
      },
    });
    if (!pets) {
      throw boom.notFound('Pets not found');
    }
    return pets;
  }

  async addPet(id, data) {
    const patient = await models.Patient.findByPk(id);
    if (!patient) {
      throw boom.notFound('Patient not found');
    }
    const pet = await models.Pet.create({ ...data, patientId: id });
    if (!pet) {
      throw boom.badRequest('Data is not valid');
    }
    return pet;
  }

  async patialUpdatePet(patientId, petId, changes) {
    const pet = await models.Pet.findOne({
      where: {
        patientId,
        id: petId,
      },
    });
    if (!pet) {
      throw boom.notFound('Pet not found');
    }
    const updatedPet = await pet.update(changes);
    return updatedPet;
  }
}

module.exports = PatientService;
