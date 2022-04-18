const { DataTypes, Sequelize, Model } = require('sequelize');

const { veterinarianTableName } = require('./Veterinarian.model');
const { patientTableName } = require('./Patient.model');

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
  veterinarianId: {
    type: DataTypes.INTEGER,
    field: 'veterinary_id',
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
  static associate() {

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
