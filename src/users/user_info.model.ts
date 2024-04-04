import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./users.model";

interface UserInfoAttrs{
  surname: string,
  name: string,
  patronymic: string,
  dateOfBirth: string,
  school: string,
  grade: number,
  overallPoints: number,
  currentPoints: number,
  image: string,
  userId: number
}

@Table({tableName: 'userInfo'})
export class UserInfo extends Model<UserInfo, UserInfoAttrs>{

  @Column({type: DataType.STRING})
  surname: string;

  @Column({type: DataType.STRING})
  name: string;

  @Column({type: DataType.STRING})
  patronymic: string;

  @Column({type: DataType.DATEONLY})
  dateOfBirth: string;

  @Column({type: DataType.STRING})
  school: string;

  @Column({type: DataType.INTEGER})
  grade: number;

  @Column({type: DataType.INTEGER, defaultValue: 0})
  overallPoints: number;

  @Column({type: DataType.INTEGER, defaultValue: 0})
  currentPoints: number;

  @Column({type: DataType.STRING})
  image: string;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

