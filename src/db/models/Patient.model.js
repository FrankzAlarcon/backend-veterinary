const { DataTypes, Sequelize, Model } = require('sequelize');

const patientTableName = 'patients';

const PatientSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  petName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'pet_name',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Patient extends Model {
  static associate(models) {
    this.hasMany(models.Appointment, { as: 'appointments', foreignKey: 'patientId' });
    this.belongsToMany(models.Veterinarian, {
      through: models.Appointment,
      as: 'veterinarians',
      foreignKey: 'patientId',
      otherKey: 'veterinarianId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: patientTableName,
      modelName: 'Patient',
      timestamps: false,
    };
  }
}

module.exports = {
  Patient,
  patientTableName,
  PatientSchema,
};
