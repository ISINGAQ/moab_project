import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { UserRoles } from "../roles/user-roles.model";
import { UserShop } from "./user_items.model";

interface ShopCreationAttrs{
  title: string;
  content: string;
  cost: number;
  image: string;
}

@Table({tableName: 'shop'})
export class Shop extends Model<Shop, ShopCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  title: string;

  @Column({type: DataType.STRING, allowNull: false})
  content: string;

  @Column({type: DataType.STRING})
  image: string;

  @Column({type: DataType.INTEGER})
  cost: number;

  @BelongsToMany(() => User, ()=> UserShop)
  users: User[];

}