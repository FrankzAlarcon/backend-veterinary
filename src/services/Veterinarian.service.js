const Chance = require('chance').Chance();
const boom = require('@hapi/boom');

class VeterinarianService {
  constructor() {
    this.veterinarians = [];
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
    return veterinarian;
  }

  create(data) {
    const newVeterinarian = {
      id: this.veterinarians.length + 1,
      ...data,
      createdAt: Chance.date({ year: 2022 }),
    };
    this.veterinarians.push(newVeterinarian);
    return newVeterinarian;
  }

  async totalUpdate(id, data) {
    const index = this.veterinarians.findIndex((vet) => vet.id === id);
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

  async partialUpdate(id, changes) {
    const index = this.veterinarians.findIndex((vet) => vet.id === id);
    if (index === -1) {
      throw boom.notFound('Veterinarian not found');
    }
    this.veterinarians[index] = {
      id,
      ...changes,
    };
    return this.veterinarians[index];
  }

  async delete(id) {
    const index = this.veterinarians.findIndex((vet) => vet.id === id);
    if (index === -1) {
      throw boom.notFound('Veterinarian not found');
    }
    const deletedVet = this.veterinarians.splice(index, 1);
    return { deleted: true, data: deletedVet };
  }
}

module.exports = VeterinarianService;
