import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "../roles/roles.model";
import { User } from "../users/users.model";
import { Shop } from "./shop.model";

interface UserItemCreationAttrs{
  userId: number;
  shopItem: number;
}

@Table({tableName: 'user_shop'})
export class UserShop extends Model<UserShop>{

  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING})
  promocode: string;

  @ForeignKey(() => Shop)
  @Column({type: DataType.INTEGER})
  shopId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  userId: number;



}