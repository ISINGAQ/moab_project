import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { Event } from "./events.model";

interface RegistrationForEventsCreationAttrs{
  eventId: number;
  userId: number;
}

@Table({tableName: 'registration_for_events'})
export class RegistrationForEvents extends Model<RegistrationForEvents>{

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(() => Event)
  @Column({type: DataType.INTEGER})
  eventId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  userId: number;
}