import { Injectable, Param } from "@nestjs/common";
import { Achievements } from "./achievements.model";
import { InjectModel } from "@nestjs/sequelize";
import { Event } from "../events/events.model";
import { RegistrationForEvents } from "../events/registration-for-event.model";
import { FilesService } from "../files/files.service";
import { CreateEventDto } from "../events/dto/events.dto";
import { CreateRecordDto } from "../events/dto/create-record.dto";
import { CreateAchievementGradeDto } from "./dto/add-achievement-grade";
import { CreateAchievementDto } from "./dto/add-achievement";
import { CreateAchievementTypeDto } from "./dto/add-achievement-type";
import { AchievementGrade } from "./achievement_grade";
import { AchievementType } from "./achievement_type.model";
import { UsersService } from "../users/users.service";
import { request } from "express";

@Injectable()
export class AchievementsService {
  constructor(@InjectModel(Achievements) private achievementRepository: typeof Achievements,
              @InjectModel(AchievementGrade) private achievementGradeRepository: typeof AchievementGrade,
              @InjectModel(AchievementType) private achievementTypeRepository: typeof AchievementType,
              private fileService: FilesService,
              private userService: UsersService) {
  }
  async getAllAchievementsType() {
    const achievementsType = await this.achievementRepository.findAll()
    return achievementsType;
  }

  async getAllAchievementsGrade() {
    const achievementsGrade = await this.achievementGradeRepository.findAll()
    return achievementsGrade;
  }

  async getAchievementGrade(@Param('gradeId') gradeId: number) {
    const achievementsGrade = await this.achievementGradeRepository.findOne({where: {id: gradeId}})
    return achievementsGrade;
  }

  async addAchievementsGrade(dto: CreateAchievementGradeDto){
    const achievementsGrade = await this.achievementGradeRepository.create(dto)
    return achievementsGrade;
  }
  async getAchievementType(@Param('typeId') typeId: number) {
    const achievementsGrade = await this.achievementTypeRepository.findOne({where: {id: typeId}})
    return achievementsGrade;
  }
  async addAchievementsType(dto: CreateAchievementTypeDto){
    const achievementsType = await this.achievementTypeRepository.create(dto)
    return achievementsType;
  }

  async createAchievement(dto: CreateAchievementDto, file: any) {
    const grade = await this.achievementGradeRepository.findByPk(dto.achievementGradeId);
    console.log(grade);
    const type = await this.achievementTypeRepository.findByPk(dto.achievementTypeId);
    console.log(type);
    const user = await this.userService.getUsersById(dto.userId);
    console.log(user);
    if(grade && type && user){
      const fileName = await this.fileService.createAchievement(file);
      const achievement = await this.achievementRepository.create({...dto, file: fileName})
      const sum = grade.point * type.point;
      await this.userService.addPoints(sum,dto.userId);
      console.log("success");
      return achievement;
    }else{
      return 500;
    }

  }

  async getAllAchievements() {
    const achievements = await this.achievementRepository.findAll()
    return achievements;
  }

  async getAchievementsByUser(userId: number){
    const user = await this.achievementRepository.findAll({where: {userId: userId}})
    return user;
  }
}
