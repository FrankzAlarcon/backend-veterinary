const boom = require('@hapi/boom');

class AppointmentsService {
  constructor() {
    this.appointments = [];
  }

  async getAll() {
    return this.appointments;
  }

  async getOne(id) {
    const appointment = this.appointments.find((appoint) => appoint.id === Number(id));
    if (!appointment) {
      throw boom.notFound('Appointment not found');
    }
    return appointment;
  }

  async create(data) {
    const newAppointment = {
      id: this.appointments.length + 1,
      ...data,
    };
    this.appointments.push(newAppointment);
    return newAppointment;
  }

  async totalUpdate(id, data) {
    const index = this.appointments.findIndex((appointment) => appointment.id === Number(id));
    if (index === -1) {
      throw boom.notFound('Appointment not found');
    }
    const appointment = this.appointments[index];
    this.appointments[index] = {
      id: appointment.id,
      ...data,
      createdAt: appointment.createdAt,
    };
    return this.appointments[index];
  }

  async partialUpdate(id, changes) {
    const index = this.appointments.findIndex((appointment) => appointment.id === Number(id));
    if (index === -1) {
      throw boom.notFound('Appointment not found');
    }
    const appointment = this.appointments[index];
    this.appointments[index] = {
      ...appointment,
      ...changes,
    };
    return this.appointments[index];
  }

  async delete(id) {
    const index = this.appointments.findIndex((appointment) => appointment.id === Number(id));
    if (index === -1) {
      throw boom.notFound('Appointment not found');
    }
    const deletedAppointment = this.appointments.splice(index, 1);
    return { deleted: true, data: deletedAppointment };
  }
}

module.exports = AppointmentsService;
