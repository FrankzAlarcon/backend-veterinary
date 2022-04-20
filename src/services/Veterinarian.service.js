const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../db/sequelize');

class VeterinarianService {
  async getAll() {
    const veterinarians = await models.Veterinarian.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return veterinarians;
  }

  async getOne(id) {
    const veterinarian = await models.Veterinarian.findByPk(id, {
      include: [
        {
          association: 'tasks',
          attributes: {
            exclude: 'veterinarianId',
          },
        },
        {
          association: 'appointments',
          include: [
            {
              association: 'patient',
              attributes: {
                exclude: 'createdAt',
              },
            },
          ],
          attributes: {
            exclude: ['veterinarianId', 'patientId'],
          },
        },
      ],
      attributes: {
        exclude: ['password'],
      },
    });
    if (!veterinarian) {
      throw boom.notFound('Veterinarian not found');
    }
    return veterinarian;
  }

  async create(data) {
    const newVeterinarian = await models.Veterinarian.create(data);
    return newVeterinarian;
  }

  async register(data) {
    const { email } = data;
    const isAlreadyRegistered = await models.Veterinarian.findOne({
      where: {
        email,
      },
    });
    if (isAlreadyRegistered) {
      throw boom.conflict('Un usuario con este email ya se encuentra registrado');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const newVeterinarian = await models.Veterinarian.create(data);
    return newVeterinarian;
  }

  async login(credentials) {
    const { email, password } = credentials;
    const user = await models.Veterinarian.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw boom.conflict('No existe un usuario registrado con este correo');
    }
    const matchPassword = await bcrypt.compare(password, user.getDataValue('password'));
    if (!matchPassword) {
      return { isLogged: matchPassword };
    }
    return { isLogged: matchPassword, key: user.getDataValue('id') };
  }

  async createTask(id, data) {
    const veterinarianExists = await models.Veterinarian.findByPk(id);
    if (!veterinarianExists) {
      throw boom.notFound('Veterinarian not found');
    }
    const newTask = await models.Task.create({ ...data, veterinarianId: id });
    return newTask;
  }

  async totalUpdate(id, data) {
    const veterinarian = await this.getOne(id);
    const { password } = data;
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }
    const updatedVet = veterinarian.update(data);
    return updatedVet;
  }

  async totalTaskUpdate(veterinarianId, taskId, data) {
    const task = await models.Task.findOne({
      where: {
        veterinarianId,
        id: taskId,
      },
    });
    if (!task) {
      throw boom.notFound('Task not found');
    }
    const updatedTask = await task.update(data);
    return updatedTask;
  }

  async partialUpdate(id, changes) {
    const veterinarian = await this.getOne(id);
    const { password } = changes;
    if (password) {
      changes.password = await bcrypt.hash(password, 10);
    }
    const updatedVet = await veterinarian.update(changes);
    return updatedVet;
  }

  async partialTaskUpdate(veterinarianId, taskId, changes) {
    const task = await models.Task.findOne({
      where: {
        veterinarianId,
        id: taskId,
      },
    });
    if (!task) {
      throw boom.notFound('Task not found');
    }
    const updatedTask = await task.update(changes);
    return updatedTask;
  }

  async delete(id) {
    const veterinarian = await this.getOne(id);
    await veterinarian.destroy();
    return { deleted: true, data: veterinarian };
  }

  async deleteTask(veterinarianId, taskId) {
    const task = await models.Task.findOne({
      where: {
        veterinarianId,
        id: taskId,
      },
    });
    if (!task) {
      throw boom.notFound('Task not found');
    }
    await task.destroy();
    return { deleted: true, data: task };
  }
}

module.exports = VeterinarianService;
