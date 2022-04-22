const boom = require('@hapi/boom');
const { models } = require('../db/sequelize');

class AppointmentsService {
  async getAll() {
    const appointments = models.Appointment.findAll({
      include: [
        {
          association: 'veterinarian',
          attributes: ['id', 'name'],
        },
        {
          association: 'patient',
          attributes: ['id', 'name'],
        },
      ],
      attributes: {
        exclude: ['veterinarianId', 'patientId'],
      },
    });
    return appointments;
  }

  async getOne(id) {
    const appointment = await models.Appointment.findByPk(id, {
      include: [
        {
          association: 'veterinarian',
          attributes: ['id', 'name', 'email'],
        },
        {
          association: 'patient',
          attributes: ['id', 'name', 'email'],
        },
        {
          association: 'pet',
          attributes: {
            exclude: ['createdAt'],
          },
        },
      ],
      attributes: {
        exclude: ['veterinarianId', 'patientId'],
      },
    });
    if (!appointment) {
      throw boom.notFound('Appointment not found');
    }
    return appointment;
  }

  async #existVeterinarianAndPatient(veterinarianId, patientId, petId) {
    const [veterinarian, patient, pet] = await Promise.allSettled([
      models.Veterinarian.findByPk(veterinarianId),
      models.Patient.findByPk(patientId),
      models.Pet.findByPk(petId),
    ]);
    if (!veterinarian.value || !patient.value || !pet.value) {
      return { allowed: false, error: 'veterinarianId, patientId or petId do not exist' };
    }
    if (patient.value.id !== pet.value.patientId) {
      return { allowed: false, error: 'Pet does not belong to PatientId' };
    }
    return { allowed: true, error: '' };
  }

  async create(data) {
    const { veterinarianId, patientId, petId } = data;
    const exist = await this.#existVeterinarianAndPatient(veterinarianId, patientId, petId);
    if (!exist.allowed) {
      throw boom.badRequest(exist.error);
    }
    const newAppointment = models.Appointment.create(data);
    return newAppointment;
  }

  async totalUpdate(id, data) {
    const appointment = await models.Appointment.findByPk(id);
    if (!appointment) {
      throw boom.notFound('Appointment not found');
    }
    const { veterinarianId, patientId, petId } = data;
    const exist = await this.#existVeterinarianAndPatient(veterinarianId, patientId, petId);
    if (!exist.allowed) {
      throw boom.badRequest(exist.error);
    }
    const updatedAppointment = await appointment.update(data);
    return updatedAppointment;
  }

  async partialUpdate(id, changes) {
    const appointment = await models.Appointment.findByPk(id);
    if (!appointment) {
      throw boom.notFound('Appointment not found');
    }
    const { veterinarianId, patientId, petId } = changes;
    if (veterinarianId) {
      const veterinarian = await models.Veterinarian.findByPk(veterinarianId);
      if (!veterinarian) {
        throw boom.badRequest('veterinarianId does not exists');
      }
    }
    if (patientId && petId) {
      const [patient, pet] = await Promise.allSettled([
        models.Patient.findByPk(patientId, {
          include: 'pets',
        }),
        models.Pet.findByPk(petId),
      ]);
      if (!patient.value || !pet.value) {
        throw boom.badRequest('patientId or petId does not exists');
      }
      if (pet.value.patientId !== patientId) {
        throw boom.badRequest(`Patient is not owner of pet: ${petId}`);
      }
    } else {
      if (patientId) {
        const patient = await models.Patient.findByPk(patientId, {
          include: 'pets',
        });
        if (!patient) {
          throw boom.badRequest('patientId does not exists');
        }
        const hasPet = patient.pets.find((pet) => pet.id === appointment.petId);
        if (!hasPet) {
          throw boom.badRequest(`Patient is not owner of pet: ${appointment.petId}`);
        }
      }
      if (petId) {
        const pet = await models.Pet.findByPk(petId);
        if (!pet) {
          throw boom.badRequest('petId does not exists');
        }
        if (appointment.patientId !== pet.patientId) {
          throw boom.badRequest(`Pet ${pet.id} does not belong to PatientId`);
        }
      }
    }
    const updatedAppointment = await appointment.update(changes);
    return updatedAppointment;
  }

  async delete(id) {
    const appointment = await this.getOne(id);
    await appointment.destroy();
    return { deleted: true, data: appointment };
  }
}

module.exports = AppointmentsService;
