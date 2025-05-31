import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { MartialArt, VALID_MARTIAL_ARTS, VALID_BELTS } from '../types/student';

interface StudentAttributes {
  id: number;
  name: string;
  age: number;
  belt?: string;
  weight: number;
  martialArts: MartialArt[];
  phone: string;
  email: string;
  address: string;
  startDate: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, 'id' | 'createdAt' | 'updatedAt' | 'belt' | 'startDate' | 'active'> {}

class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
  public id!: number;
  public name!: string;
  public age!: number;
  public belt!: string;
  public weight!: number;
  public martialArts!: MartialArt[];
  public phone!: string;
  public email!: string;
  public address!: string;
  public startDate!: Date;
  public active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 5,
        max: 100,
      },
    },
    belt: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [VALID_BELTS],
      },
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    martialArts: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isValidMartialArts(value: MartialArt[]) {
          if (!Array.isArray(value)) {
            throw new Error('martialArts must be an array');
          }
          if (!value.every(art => VALID_MARTIAL_ARTS.includes(art))) {
            throw new Error('Invalid martial art');
          }
        },
      },
      get() {
        const value = this.getDataValue('martialArts');
        // Se for string, fazer parse do JSON
        if (typeof value === 'string') {
          try {
            return JSON.parse(value);
          } catch {
            return [];
          }
        }
        // Se já for array, retornar como está
        return Array.isArray(value) ? value : [];
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Student',
    tableName: 'students',
  }
);

export { Student }; 