import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AchievementGradeCreationAttrs{
  title: string;
  point: number
}

@Table({tableName: 'achievements_grade'})
export class AchievementGrade extends Model<AchievementGrade, AchievementGradeCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  title: string;

  @Column({type: DataType.INTEGER})
  point: number;


}