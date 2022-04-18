const { DataTypes, Sequelize, Model } = require('sequelize');

const tasksTableName = 'tasks';

const TaskSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'medium',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
    field: 'created_at',
  },
  veterinarianId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'veterinarian_id',
    references: {
      model: 'Veterinarian',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
};

class Task extends Model {
  static associate() {
    // code
    // this.belongsTo(models.Veterinarian)
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: tasksTableName,
      modelName: 'Task',
      timestamps: false,
    };
  }
}

module.exports = {
  Task,
  TaskSchema,
  tasksTableName,
};
