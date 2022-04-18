const { DataTypes, Sequelize, Model } = require('sequelize');

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
  veterinaryId: {
    type: DataTypes.INTEGER,
    field: 'veterinary_id',
    references: {
      model: 'Veterinarian',
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  patientId: {
    type: DataTypes.INTEGER,
    field: 'patient_id',
    references: {
      model: 'Patient',
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
  static associote() {

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
