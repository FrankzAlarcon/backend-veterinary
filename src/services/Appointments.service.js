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
          attributes: ['id', 'name', 'petName', 'email'],
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

  async #existVeterinarianAndPatient(veterinarianId, patientId) {
    const [veterinarian, patient] = await Promise.allSettled([
      models.Veterinarian.findByPk(veterinarianId),
      models.Patient.findByPk(patientId),
    ]);
    if (!veterinarian.value || !patient.value) {
      return false;
    }
    return true;
  }

  async create(data) {
    const { veterinarianId, patientId } = data;
    const exist = await this.#existVeterinarianAndPatient(veterinarianId, patientId);
    if (!exist) {
      throw boom.badRequest('veterinarianId or patientId does not exists');
    }
    const newAppointment = models.Appointment.create(data);
    return newAppointment;
  }

  async totalUpdate(id, data) {
    const appointment = await models.Appointment.findByPk(id);
    if (!appointment) {
      throw boom.notFound('Appointment not found');
    }
    const { veterinarianId, patientId } = data;
    const exist = await this.#existVeterinarianAndPatient(veterinarianId, patientId);
    if (!exist) {
      throw boom.badRequest('veterinarianId or patientId does not exists');
    }
    const updatedAppointment = await appointment.update(data);
    return updatedAppointment;
  }

  async partialUpdate(id, changes) {
    const appointment = await models.Appointment.findByPk(id);
    if (!appointment) {
      throw boom.notFound('Appointment not found');
    }
    const { veterinarianId, patientId } = changes;
    if (veterinarianId) {
      const veterinarian = await models.Veterinarian.findByPk(veterinarianId);
      if (!veterinarian) {
        throw boom.badRequest('veterinarianId does not exists');
      }
    }
    if (patientId) {
      const patient = await models.Patient.findByPk(patientId);
      if (!patient) {
        throw boom.badRequest('patientId does not exists');
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
