import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Profile extends Model {
  public id!: number;
  public name!: string;
  public bio!: string;
  public location!: string;
  public nationality!: string;
  public availability!: string;
  public dateOfBirth!: Date;
  public email!: string;
  public phone!: string;
  public address!: string;
  public github!: string;
  public twitter!: string;
  public linkedin!: string;
  public expectedSalary!: number;
  public ownACar!: boolean;
  public haveDrivingLicense!: boolean;
  public noticePeriod!: number;
  public immigrationStatus!: string;
  public referees!: any;
  public willingToRelocate!: boolean;
  public languages!: any;
  public skills!: any;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    availability: {
      type: DataTypes.ENUM('available', 'interviewing', 'not-available'),
      defaultValue: 'available',
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    github: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    twitter: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    linkedin: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    expectedSalary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    ownACar: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    haveDrivingLicense: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    noticePeriod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    immigrationStatus: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    referees: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('referees');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value: any) {
        this.setDataValue('referees', JSON.stringify(value));
      },
    },
    willingToRelocate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    languages: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('languages');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value: any) {
        this.setDataValue('languages', JSON.stringify(value));
      },
    },
    skills: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('skills');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value: any) {
        this.setDataValue('skills', JSON.stringify(value));
      },
    },
  },
  {
    sequelize,
    tableName: 'profiles',
    timestamps: true,
  }
);

export default Profile;