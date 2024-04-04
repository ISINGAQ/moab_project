import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { ValidationPipe } from "../pipes/validation.pipe";
import { UserInfoDto } from "./dto/user-info.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status: 200, type: User})
  @Post()
  create(@Body() userDto: CreateUserDto){
    return this.usersService.createUser(userDto);
  }
  // @ApiOperation({summary: 'Выдача ролей'})
  // @ApiResponse({status: 200})
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto){
    return this.usersService.addRole(dto);
  }
  @UseInterceptors(FileInterceptor('image'))
  @Post("/addUserInfo")
  addUserInfo(@Body() userDto: UserInfoDto,
              @UploadedFile() image){
    return this.usersService.createUserInfo(userDto, image);
  }

  @Get("/getTop10")
  getTop10(){
    return this.usersService.getTop10();
  }
}
