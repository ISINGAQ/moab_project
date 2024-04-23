import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { Post } from "../posts/posts.model";
import { RegistrationForEvents } from "../events/registration-for-event.model";
import { Event } from "../events/events.model";
import { UserInfo } from "./user_info.model";
import { UserShop } from "../shop/user_items.model";
import { Shop } from "../shop/shop.model";

interface UserCreationAttrs{
    login: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @ApiProperty({example: 'login', description: 'Имя пользователя'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  login: string;
  @ApiProperty({example: 'p4$$w0rd', description: 'Пароль пользователя'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @BelongsToMany(() => Role, ()=> UserRoles)
  roles: Role[];


  @HasMany(() => Post)
  posts: Post[];

  @HasOne(() => UserInfo)
  userInfo: UserInfo;

  @BelongsToMany(() => Shop, ()=> UserShop)
  shops: Shop[];

}