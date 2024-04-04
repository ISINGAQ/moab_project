import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { PostsService } from "../posts/posts.service";
import { PostsController } from "../posts/posts.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Post } from "../posts/posts.model";
import { FilesModule } from "../files/files.module";
import { Achievements } from "./achievements.model";
import { UsersModule } from "../users/users.module";
import { AchievementGrade } from "./achievement_grade";
import { AchievementType } from "./achievement_type.model";
import { AchievementsController } from "./achievements.controller";
import { EventsService } from "../events/events.service";

@Module({
  providers: [AchievementsService],
  controllers: [AchievementsController],
  imports: [
    SequelizeModule.forFeature([Achievements, AchievementGrade, AchievementType, User]),
    FilesModule,
    UsersModule
  ],
  exports:[
    AchievementsService
  ]
})
export class AchievementsModule {}
