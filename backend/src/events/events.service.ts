import { HttpException, HttpStatus, Injectable, Param } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "../files/files.service";
import { Event } from "./events.model";
import { CreateEventDto } from "./dto/events.dto";
import { CreateRecordDto } from "./dto/create-record.dto";
import { RegistrationForEvents } from "./registration-for-event.model";

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event) private eventRepository: typeof Event,
              @InjectModel(RegistrationForEvents) private registrationForEvents: typeof RegistrationForEvents,
              private fileService: FilesService) {
  }
  async create(dto: CreateEventDto, image: any, file: any) {
    const imageName = await this.fileService.createFile(image);
    const fileName = await this.fileService.addEventStatement(file);
    const event = await this.eventRepository.create({...dto,image: imageName, statement: fileName})
    return event;
  }

  async add(dto: CreateRecordDto) {
        const record = await this.registrationForEvents.create(dto)
        return record;
  }


  async getAllEvents(){
    const events = await this.eventRepository.findAll();
    return events;
  }

  async getOneRecord(@Param('userId') userId: number, @Param('eventId') eventId: number){
    const record = await this.registrationForEvents.findOne({where: {userId: userId, eventId: eventId}})
    if (record === null)  throw new HttpException('Запись не найдена', HttpStatus.NOT_FOUND);

    return record;
  }
}
