import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AchievementsService } from "./achievements.service";
import { CreateAchievementDto } from "./dto/add-achievement";
import { CreateAchievementTypeDto } from "./dto/add-achievement-type";
import { CreateAchievementGradeDto } from "./dto/add-achievement-grade";

@Controller('achievements')
export class AchievementsController {
  constructor(private achievementsService: AchievementsService) {
  }
  @Post("/createAchievement")
  @UseInterceptors(FileInterceptor('file'))
  createAchievement(@Body() dto:CreateAchievementDto,
              @UploadedFile() image){
    return this.achievementsService.createAchievement(dto, image);
  }

  @Post("/addGrade")
  addAchievementsGrade(@Body() dto:CreateAchievementGradeDto){
    return this.achievementsService.addAchievementsGrade(dto);
  }
  @Post("/addType")
  addAchievementsType(@Body() dto:CreateAchievementTypeDto){
    return this.achievementsService.addAchievementsType(dto);
  }

  @Get("/getTypes")
  getAllType(){
    return this.achievementsService.getAllAchievementsType();
  }

  @Get("/getGrades")
  getAllGrades(){
    return this.achievementsService.getAllAchievementsGrade();
  }


  @Get("/getGradeById")
  getGradeById(@Query('id') id: number){
    return this.achievementsService.getAchievementGrade(id);
  }

  @Get("/getTypeById")
  getTypeById(@Query('id') id: number){
    return this.achievementsService.getAchievementType(id);
  }

  @Get("/getAllAchievements")
  getAllAchievements(){
    return this.achievementsService.getAllAchievements();
  }

  @Get("/getAllAchievementsByUser")
  getAllAchievementsByUser(@Query('userId') userId: number){
    return this.achievementsService.getAchievementsByUser(userId);
  }
}
