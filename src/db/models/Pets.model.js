const { Sequelize, DataTypes, Model } = require('sequelize');

const petsTableName = 'pets';
const { patientTableName } = require('./Patient.model');

const PetsSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  petName: {
    field: 'pet_name',
    type: DataTypes.STRING,
    allowNull: false,
  },
  animalType: {
    field: 'animal_type',
    allowNull: false,
    type: DataTypes.STRING,
  },
  patientId: {
    field: 'patient_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: patientTableName,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  createdAt: {
    type: DataTypes.DATE,
    default: Sequelize.NOW,
    allowNull: false,
    field: 'created_at',
  },
};

class Pet extends Model {
  static associate(models) {
    this.belongsTo(models.Patient, { as: 'patient' });
    this.hasMany(models.Appointment, { as: 'appointments', foreignKey: 'petId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: petsTableName,
      modelName: 'Pet',
      timestamps: false,
    };
  }
}

module.exports = {
  Pet,
  PetsSchema,
  petsTableName,
};
