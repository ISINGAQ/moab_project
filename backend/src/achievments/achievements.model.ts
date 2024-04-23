import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { AchievementGrade } from "./achievement_grade";
import { AchievementType } from "./achievement_type.model";

interface AchievementsCreationAttrs{
  id: number;
  title: string;
  content: string;
  userId: number;
  file: string;
  dateOfObtained: string;
  achievementGradeId: number;
  achievementTypeId: number;
  achievementGradeTitle: string;
}

@Table({tableName: 'achievements'})
export class Achievements extends Model<Achievements, AchievementsCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  title: string;

  @Column({type: DataType.STRING, allowNull: false})
  content: string;

  @Column({type: DataType.STRING})
  file: string;

  @Column({type: DataType.DATEONLY})
  dateOfObtained: string;

  @Column({type: DataType.STRING})
  direction: string;

  @Column({type: DataType.BOOLEAN, defaultValue: true})
  verified: boolean;

  @ForeignKey(() => AchievementGrade)
  @Column({type: DataType.INTEGER})
  achievementGradeId: number;

  @ForeignKey(() => AchievementType)
  @Column({type: DataType.INTEGER})
  achievementTypeId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @BelongsTo(() => User)
  author: User;




}