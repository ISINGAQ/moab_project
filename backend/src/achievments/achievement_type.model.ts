import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AchievementsTypeCreationAttrs{
  title: string;
  point: number
}

@Table({tableName: 'achievements_type'})
export class AchievementType extends Model<AchievementType, AchievementsTypeCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  title: string;

  @Column({type: DataType.DOUBLE})
  point: number;


}