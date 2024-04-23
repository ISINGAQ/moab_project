import { Body, Controller, Get, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/events.dto";
import { CreateRecordDto } from "./dto/create-record.dto";

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {
  }
  @Post("/createEvent")
  @UseInterceptors(FilesInterceptor('files', 2))
  createEvent(@Body() dto:CreateEventDto,
              @UploadedFiles() files){
    return this.eventsService.create(dto,files[0],files[1]);
  }

  @Post("/createRecord")
  createRecord(@Body() dto:CreateRecordDto)
  {
    return this.eventsService.add(dto);
  }

  @Get("/getOneRecord")
  getOneRecord(@Query('userId') userId: number, @Query('eventId') eventId: number){
    return this.eventsService.getOneRecord(userId,eventId);
  }

  @Get("/getAllEvents")
  getAllEvents()
  {
    return this.eventsService.getAllEvents();
  }
}
