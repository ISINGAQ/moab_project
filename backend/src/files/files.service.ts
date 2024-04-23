import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

  async createFile(file): Promise<string>{
      try{
        console.log("bingo1")
          const fileName = uuid.v4() + '.png';
          const filePath = path.resolve(__dirname, '..', 'static')
          if(!fs.existsSync(filePath)){
            console.log("bingo2")
            fs.mkdirSync(filePath, {recursive: true})
          }
          fs.writeFileSync(path.join(filePath, fileName), file.buffer)
        console.log("bingo3")
          return fileName;
      } catch (e){
        console.log("bingo4")
        throw new HttpException('Ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
      }
  }

  async createAchievement(file): Promise<string>{
    try{
      console.log("bingo1")
      const fileName = uuid.v4() + '.pdf';
      const filePath = path.resolve(__dirname, '..', 'static')
      if(!fs.existsSync(filePath)){
        console.log("bingo2")
        fs.mkdirSync(filePath, {recursive: true})
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer)
      console.log("bingo3")
      return fileName;
    } catch (e){
      console.log("bingo4")
      throw new HttpException('Ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async addEventStatement(file): Promise<string>{
    try{
      console.log("bingo1")
      const fileName = uuid.v4() + '.pdf';
      const filePath = path.resolve(__dirname, '..', 'static')
      if(!fs.existsSync(filePath)){
        console.log("bingo2")
        fs.mkdirSync(filePath, {recursive: true})
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer)
      console.log("bingo3")
      return fileName;
    } catch (e){
      console.log("bingo4")
      throw new HttpException('Ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


}
