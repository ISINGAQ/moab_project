import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { where } from "sequelize";
import { AddRoleDto } from "./dto/add-role.dto";
import { EventsService } from "../events/events.service";
import { UserInfo } from "./user_info.model";
import { UserInfoDto } from "./dto/user-info.dto";
import { FilesService } from "../files/files.service";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private  userRepository: typeof User,
              @InjectModel(UserInfo) private  userInfoRepository: typeof UserInfo,
              private roleService: RolesService,
              private fileService: FilesService) {
  }

      async createUser(dto: CreateUserDto){
          const user = await this.userRepository.create(dto);
          const role = await this.roleService.getRoleByValue("Admin")
          await user.$set('roles', [role.id])
          user.roles = [role]
          return user;

      }

      async createUserInfo(dto: UserInfoDto, image: any){
          const fileName = await this.fileService.createFile(image);
          const userInfo = await this.userInfoRepository.create({...dto, image: fileName});
          return userInfo;
      }

      async getCurrentPoints(userId: number){
          const points = await this.userInfoRepository.findOne({where:{userId},attributes: ['currentPoints']})
          return points;
      }

  async getOverallPoints(userId: number){
    const points = await this.userInfoRepository.findOne({where:{userId},attributes: ['overallPoints']})
    return points;
  }

  async getTop10(){
    const users = await this.userInfoRepository.findAll({attributes: ['surname','name',
        'patronymic', 'school', 'image', 'grade', 'userId'],limit: 10, order: [['overallPoints', 'ASC']]})
    return users;
  }

      async addPoints(sum: number, userId:number){
          const cPoints  = await this.userInfoRepository.findOne({where:{userId}});
          await cPoints.increment(['overallPoints','currentPoints'],  {by:sum});

          return cPoints.currentPoints
      }

  async substractPoints(sum: number, userId:number){
    const cPoints  = await this.userInfoRepository.findOne({where:{userId}});
    await cPoints.decrement(['currentPoints'],  {by:sum});

    return cPoints.currentPoints
  }


      async getUsersByLogin(login: string){
        const user = await this.userRepository.findOne({where: {login}, include: {all: true}})
          return user;
      }

  async getUsersById(id: number){
    const user = await this.userRepository.findOne({where: {id}, include: {all: true}})
    return user;
  }

      async addRole(dto: AddRoleDto){
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if(role && user){
          await user.$add('role', role.id);
          return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
      }



}
