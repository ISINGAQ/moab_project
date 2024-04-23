import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { FilesModule } from "../files/files.module";
import { Event } from "./events.model";
import { RegistrationForEvents } from "./registration-for-event.model";
import { RolesService } from "../roles/roles.service";

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [
    SequelizeModule.forFeature([User, Event,RegistrationForEvents]),
    FilesModule
  ],
  exports:[
    EventsService
  ]
})
export class EventsModule {}
