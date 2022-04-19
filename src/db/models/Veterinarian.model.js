const { DataTypes, Model, Sequelize } = require('sequelize');

const veterinarianTableName = 'veterinarians';

const VeterinarianSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Veterinarian extends Model {
  static associate(models) {
    this.hasMany(models.Task, { as: 'tasks', foreignKey: 'veterinarianId' });
    this.hasMany(models.Appointment, { as: 'appointments', foreignKey: 'veterinarianId' });
    this.belongsToMany(models.Patient, {
      as: 'patients',
      through: models.Appointment,
      foreignKey: 'veterinarianId',
      otherKey: 'patientId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: veterinarianTableName,
      modelName: 'Veterinarian',
      timestamps: false,
    };
  }
}

module.exports = {
  Veterinarian,
  VeterinarianSchema,
  veterinarianTableName,
};
