const Chance = require('chance').Chance();
const boom = require('@hapi/boom');

class VeterinarianService {
  constructor() {
    this.veterinarians = [];
    this.tasks = [];
    this.generate();
  }

  generate() {
    const size = 10;
    for (let i = 0; i < size; i++) {
      this.veterinarians.push({
        id: i + 1,
        name: Chance.name(),
        email: Chance.email(),
        password: Chance.guid(),
        createdAt: Chance.date({ year: 2022 }),
      });
    }
  }

  async getAll() {
    const { veterinarians } = this;
    return veterinarians;
  }

  async getOne(id) {
    const veterinarian = this.veterinarians.find((vet) => vet.id === Number(id));
    if (!veterinarian) {
      throw boom.notFound('Veterinarian not found');
    }
    const tasks = this.tasks.filter((task) => task.veterinarianId === id);
    return { ...veterinarian, tasks: [...tasks] };
  }

  async create(data) {
    const newVeterinarian = {
      id: this.veterinarians.length + 1,
      ...data,
      createdAt: Chance.date({ year: 2022 }),
    };
    this.veterinarians.push(newVeterinarian);
    return newVeterinarian;
  }

  async createTask(id, data) {
    const veterinarianExist = this.veterinarians.find((vet) => vet.id === Number(id));
    if (!veterinarianExist) {
      throw boom.notFound('Veterinarian not found');
    }
    const newTask = {
      id: this.tasks.length + 1,
      ...data,
      veterinarianId: id,
      createdAt: Chance.date({ year: 2022 }),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  async totalUpdate(id, data) {
    const index = this.veterinarians.findIndex((vet) => vet.id === Number(id));
    if (index === -1) {
      throw boom.notFound('Veterinarian not found');
    }
    const veterinarian = this.veterinarians[index];
    this.veterinarians[index] = {
      id: veterinarian.id,
      ...data,
      createdAt: veterinarian.createdAt,
    };
    return this.veterinarians[index];
  }

  async totalTaskUpdate(veterinarianId, taskId, data) {
    const veterinarian = await this.getOne(veterinarianId);
    const taskIndex = veterinarian.tasks.findIndex((task) => task.id === Number(taskId));
    if (taskIndex === -1) {
      throw boom.notFound('Task not found');
    }
    const task = this.tasks[taskIndex];
    this.tasks[taskIndex] = {
      ...task,
      ...data,
    };
    return this.tasks[taskIndex];
  }

  async partialUpdate(id, changes) {
    const index = this.veterinarians.findIndex((vet) => vet.id === Number(id));
    if (index === -1) {
      throw boom.notFound('Veterinarian not found');
    }
    const veterinarian = this.veterinarians[index];
    this.veterinarians[index] = {
      ...veterinarian,
      ...changes,
    };
    return this.veterinarians[index];
  }

  async partialTaskUpdate(veterinarianId, taskId, changes) {
    const veterinarian = await this.getOne(veterinarianId);
    const taskIndex = veterinarian.tasks.findIndex((task) => task.id === Number(taskId));
    if (taskIndex === -1) {
      throw boom.notFound('Task not found');
    }
    const task = this.tasks[taskIndex];
    this.tasks[taskIndex] = {
      ...task,
      ...changes,
    };
    return this.tasks[taskIndex];
  }

  async delete(id) {
    const index = this.veterinarians.findIndex((vet) => vet.id === Number(id));
    if (index === -1) {
      throw boom.notFound('Veterinarian not found');
    }
    const deletedVet = this.veterinarians.splice(index, 1);
    return { deleted: true, data: deletedVet };
  }

  async deleteTask(veterinarianId, taskId) {
    const veterinarian = await this.getOne(veterinarianId);
    const taskIndex = veterinarian.tasks.findIndex((task) => task.id === Number(taskId));
    if (taskIndex === -1) {
      throw boom.notFound('Task not found');
    }
    const deletedTask = this.tasks.splice(taskIndex, 1);
    return { deleted: true, data: deletedTask };
  }
}

module.exports = VeterinarianService;
