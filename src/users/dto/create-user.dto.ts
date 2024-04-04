import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateUserDto{
  @ApiProperty({example: '1', description: 'Имя пользователя'})
  readonly login: string;
  @ApiProperty({example: 'p4$$w0rd', description: 'Пароль'})
  @IsString({message: "Должно быть строкой"})
  @Length(4, 16, {message: 'Не менее 4 и не более 16 символов'})
  readonly password: string;
}