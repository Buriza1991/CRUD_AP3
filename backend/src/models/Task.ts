import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { TaskAttributes } from '../types/task';

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description!: string | null;
  public status!: 'pending' | 'in_progress' | 'completed';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'tasks',
  }
);

export { Task }; 