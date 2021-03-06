const { DataTypes, Sequelize, Model } = require('sequelize');

const { veterinarianTableName } = require('./Veterinarian.model');
const { patientTableName } = require('./Patient.model');
const { petsTableName } = require('./Pets.model');

const appointmentsTableName = 'appointments';

const AppointmentsSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  symptoms: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prescription: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_completed',
  },
  price: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  petId: {
    type: DataTypes.INTEGER,
    field: 'pet_id',
    references: {
      model: petsTableName,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  veterinarianId: {
    type: DataTypes.INTEGER,
    field: 'veterinarian_id',
    references: {
      model: veterinarianTableName,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  patientId: {
    type: DataTypes.INTEGER,
    field: 'patient_id',
    references: {
      model: patientTableName,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Appointment extends Model {
  static associate(models) {
    this.belongsTo(models.Veterinarian, { as: 'veterinarian' });
    this.belongsTo(models.Patient, { as: 'patient' });
    this.belongsTo(models.Pet, { as: 'pet' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: appointmentsTableName,
      modelName: 'Appointment',
      timestamps: false,
    };
  }
}

module.exports = {
  appointmentsTableName,
  AppointmentsSchema,
  Appointment,
};
