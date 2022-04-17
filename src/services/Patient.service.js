const Chance = require('chance').Chance();
const boom = require('@hapi/boom');

class PatientService {
  constructor() {
    this.patients = [];
    this.generate();
  }

  generate() {
    const size = 20;
    for (let i = 0; i < size; i++) {
      this.patients.push({
        id: i + 1,
        name: Chance.name(),
        petName: Chance.first(),
        email: Chance.email(),
        createdAt: Chance.date({ year: 2022 }),
      });
    }
  }

  async getAll() {
    return this.patients;
  }

  async getOne(id) {
    const patient = this.patients.find((pat) => pat.id === Number(id));
    if (!patient) {
      throw boom.notFound('Patient not found');
    }
    return patient;
  }

  async create(data) {
    const newPatient = {
      id: this.patients.length + 1,
      ...data,
      createdAt: Chance.date({ year: 2022 }),
    };
    this.patients.push(newPatient);
    return newPatient;
  }

  async totalUpdate(id, data) {
    const index = this.patients.findIndex((pat) => pat.id === Number(id));
    if (index === -1) {
      throw boom.notFound('Patients not found');
    }
    const patient = this.patients[index];
    this.patients[index] = {
      id: patient.id,
      ...data,
      createdAt: patient.createdAt,
    };
    return this.patients[index];
  }

  async partialUpdate(id, changes) {
    const index = this.patients.findIndex((pat) => pat.id === Number(id));
    if (index === -1) {
      throw boom.notFound('Patient not found');
    }
    const patient = this.patients[index];
    this.patients[index] = {
      ...patient,
      ...changes,
    };
    return this.patients[index];
  }

  async delete(id) {
    const index = this.patients.findIndex((pat) => pat.id === Number(id));
    if (index === -1) {
      throw boom.notFound('Patient not found');
    }
    const deletedPat = this.patients.splice(index, 1);
    return { deleted: true, data: deletedPat };
  }
}

module.exports = PatientService;
