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
  static associate() {
    // code
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
