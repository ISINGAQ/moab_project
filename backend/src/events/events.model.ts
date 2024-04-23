import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { RegistrationForEvents } from "./registration-for-event.model";
import { UserRoles } from "../roles/user-roles.model";

interface EventCreationAttrs{
  title: string;
  content: string;
  userId: number;
  image: string;
  statement: string;
  dateOfEvent: string;
  address: string;
  gradeStart: number;
  gradeEnd: number;
  length: string;
}

@Table({tableName: 'events'})
export class Event extends Model<Event, EventCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  title: string;

  @Column({type: DataType.TEXT, allowNull: false})
  content: string;

  @Column({type: DataType.STRING})
  image: string;

  @Column({type: DataType.STRING})
  statement: string;

  @Column({type: DataType.STRING})
  organization: string;

  @Column({type: DataType.DATE})
  dateOfEvent: string;

  @Column({type: DataType.STRING})
  address: string;

  @Column({type: DataType.INTEGER})
  gradeStart: number;

  @Column({type: DataType.INTEGER})
  gradeEnd: number;

  @Column({type: DataType.STRING})
  length: string;

  @Column({type: DataType.BOOLEAN})
  isInternal: boolean;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;


}