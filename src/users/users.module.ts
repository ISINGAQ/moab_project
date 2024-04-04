import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SEQUELIZE_MODULE_ID } from "@nestjs/sequelize/dist/sequelize.constants";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";
import { Post } from "../posts/posts.model";
import { Event } from "../events/events.model";
import { RegistrationForEvents } from "../events/registration-for-event.model";
import { EventsModule } from "../events/events.module";
import { UserInfo } from "./user_info.model";
import { FilesModule } from "../files/files.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, UserInfo, Role, UserRoles, Post, Event, RegistrationForEvents]),
    forwardRef(() => AuthModule),
    RolesModule,
    EventsModule,
    FilesModule
  ],
  exports:[
    UsersService,


  ]
})
export class UsersModule {}
