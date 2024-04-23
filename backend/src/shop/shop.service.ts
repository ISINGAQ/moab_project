import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePostDto } from "../posts/dto/create-post.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "../roles/roles.model";
import { Shop } from "./shop.model";
import { UserShop } from "./user_items.model";
import { FilesService } from "../files/files.service";
import { CreateShopDto } from "./dto/create-shop.dto";
import { UserInfo } from "../users/user_info.model";
import { UsersService } from "../users/users.service";

@Injectable()
export class ShopService {

  constructor(
    @InjectModel(UserShop) private userShopRepository: typeof UserShop,
    @InjectModel(Shop) private shopRepository: typeof Shop,
    private userInfoService: UsersService,
    private fileService: FilesService) {
  }
  async create(dto: CreateShopDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const shop = await this.shopRepository.create({...dto, image: fileName})
    return shop;

  }
  async getAllShops(){
    const shop = await this.shopRepository.findAll()
    return shop;
  }

  async purchase(userId: number, shopId: number){
    const userInfo = await this.userInfoService.getCurrentPoints(userId)
    const shop = await this.shopRepository.findByPk(shopId)
    if(userInfo.currentPoints >= shop.cost){
      await this.userInfoService.substractPoints(shop.cost, userId)
      const userShop = await this.userShopRepository.create({
        userId: userId,
        shopId: shopId,
        promocode: this.makeString()
      })
      return userShop
    }else{
      {
        console.log("Не хватает токенов")
        throw new HttpException('Не хватает валюты', HttpStatus.BAD_REQUEST);
      }
    }
  }
  makeString(): string {
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 32; i++) {

      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));

    }

    return outString;
  }
}
