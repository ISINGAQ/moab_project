import { Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { User } from "../users/users.model";

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {
  }

  async login(@Body() userDto: CreateUserDto){
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(@Body() userDto: CreateUserDto){
    const candidate = await this.userService.getUsersByLogin(userDto.login);
    if(candidate){
      throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({...userDto, password: hashPassword})
    return this.generateToken(user)
  }

  async generateToken(user: User){
    const payload = {login: user.login, id: user.id, roles: user.roles, userInfo: user.userInfo}
    return{
      token: this.jwtService.sign(payload)

    }
  }

  private async validateUser(userDto: CreateUserDto){
    const user = await this.userService.getUsersByLogin(userDto.login);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if(user && passwordEquals){
      return user;
    }
    throw new UnauthorizedException({message: 'Неправильный логин или пароль'})
  }

}
